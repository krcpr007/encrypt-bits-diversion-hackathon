from fastapi import APIRouter, File, UploadFile, Depends, Form
from fastapi.responses import JSONResponse
from app.models import patient
from app.config import database
from app.utils import json_encoder
from pymongo.database import Database
from app.config.s3 import s3
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from bson import ObjectId
from bson.json_util import dumps
import bchlib
import os
import pickle
from io import BytesIO
import numpy as np
from PIL import Image
from reedsolo import RSCodec
import binascii
from sklearn.preprocessing import StandardScaler

router = APIRouter()
# ../../../Model/trained_model.h5//
S3_BUCKET_NAME = "encrypt-bits"
S3_REGION = "ap-south-1"
os.chdir(os.path.dirname(os.path.abspath(__file__)))
image_folder = "../../../train/eye"
# images = []
# for filename in os.listdir(image_folder):
#     img = Image.open(os.path.join(image_folder, filename)).convert('L') # convert to grayscale
#     img = img.resize((512, 512)) # resize image to 64x64 pixels
#     images.append(img)
#     print("Image appending...\n")

# print(images)
images_pickle_file = "images.pkl"
if os.path.exists(images_pickle_file):
    with open(images_pickle_file, "rb") as f:
        images = pickle.load(f)
else:
    images = []
    for filename in os.listdir(image_folder):
        img = Image.open(os.path.join(image_folder, filename)).convert(
            "L"
        )  # convert to grayscale
        img = img.resize((512, 512))  # resize image to 512x512 pixels
        images.append(img)
        print("Image appending...\n")

    with open(images_pickle_file, "wb") as f:
        pickle.dump(images, f)
        print(images)
# X = []
# for img in images:
#     X.append(np.array(img).flatten())
# X = np.array(X)
# np.save('X_data.npy', X)
X = np.load("X_data.npy")
# normalize dataset
scaler = StandardScaler()
X_normalized = scaler.fit_transform(X)

# create a bch object
BCH_POLYNOMIAL = 8219
BCH_BITS = 72  # 16
# bch = bchlib.BCH(BCH_POLYNOMIAL, BCH_BITS)
rs = RSCodec(10)


@router.get("/")
def read_root():
    return {"Hello": "World"}


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/upload")
def upload_file(
    name: str = Form(...),
    key: str = Form(...),
    file: UploadFile = File(...),
    db: Database = Depends(database.get_database),
):
    print("this is file ", file)
    try:
        model = load_model("../../../Model/trained_model.h5")
        print("Model loaded", model)
        img = Image.open(file.file).convert("L")
        img = img.resize((512, 512))
        X = np.array(img).flatten()
        X_normalized = scaler.transform(X.reshape(1, -1))
        print(X_normalized.shape, X_normalized)
        V2 = model.predict(X_normalized)  # extract feature vector V2
        V_encoded = bch.encode(V2.flatten())  # encode feature vector V2 using bch
        v_encoded = rs.encode(np.frombuffer(V_encoded, dtype=np.uint8))
        key = V_encoded
        binary_representation = binascii.hexlify(key).decode("utf-8")
        key_reshaped = np.tile(key, len(X) // len(key) + 1)[: len(X)]
        # encrypt the image using XOR operation
        X_encrypted = bytearray(X ^ key_reshaped)
        img_encrypted = Image.frombytes("L", (512, 512), bytes(X_encrypted))
        # now save  the encrypted image into s3
        # Save the encrypted image to S3
        buffer = BytesIO()
        img_encrypted.save(buffer, format="JPEG")  # Choose the appropriate format
        buffer.seek(0)
        s3_key = f"{name}/{file.filename}"
        print(s3_key)
        s3.upload_fileobj(buffer, "encrypt-bits", s3_key)
        url = f"https://encrypt-bits.s3.{S3_REGION}.amazonaws.com/{s3_key}"
        print("url", url)
        patient_data = patient.Patient(
            name=name, key=binary_representation, imageUrl=url
        )
        try:
            db["patients"].insert_one(patient_data.model_dump())
        except Exception as e:
            return {"status": "error", "message": str(e)}
        return {
            "status": "ok",
            "message": "file uploaded",
            "key": binary_representation,
            "url": url,
        }
        # s3.upload_fileobj(file.file, "encrypt-bits", file.filename)
        # contents = file.file.read()
        # with open(file.filename, "wb") as f:
        #     f.write(contents)

    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        file.file.close()


@router.post("/download")
def download_file(
    req_body: patient.DownloadReqBody, db: Database = Depends(database.get_database)
):
    try:
        patient_key = req_body.key
        patient_id = req_body.id
        patient_data = db["patients"].find_one({"_id": ObjectId(patient_id)})
        if patient_id:
            patient_data["_id"] = str(patient_data["_id"])
    except Exception as e:
        return {"status": "error", "message": str(e)}
    return JSONResponse(status_code=200, content={"data": patient_data})
