from fastapi import APIRouter, File, UploadFile, Depends, Request, Form
from models import patient
from config import database
from utils import file_upload
from pymongo.database import Database

router = APIRouter()


@router.get("/")
def read_root():
    return {"Hello": "World"}


@router.get("/health")
def health():
    return {"status": "ok"}


# post route for uploading files
@router.post("/upload")
def upload_file(
    name: str = Form(...),
    key: str = Form(...),
    file: UploadFile = File(...),
    db: Database = Depends(database.get_database),
):
    file_upload.save_upload_file(file)
    patient_data = patient.Patient(name=name, key=key, imageUrl=file.filename)
    try:
        db["patients"].insert_one(patient_data.model_dump())
    except Exception as e:
        return {"status": "error", "message": str(e)}
    return {"msg": f"file uploaded, filename: {file.filename}"}


# get route for downloading files
@router.get("/download")
def download_file():
    print("download file")
    return {"status": "download"}


# get route for downloading all files
@router.get("/download-all")
def download_file(db: Database = Depends(database.get_database)):
    try:
        patients = db["patients"].find()
        print([patient.Patient(**patient) for patient in patients])
    except Exception as e:
        return {"status": "error", "message": str(e)}
    return {"status": "download"}
