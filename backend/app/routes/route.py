from fastapi import APIRouter, File, UploadFile, Depends, Request
from models import patient
from config import database
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
    patient: patient.Patient,
    file: UploadFile = File(...),
    db: Database = Depends(database.get_database),
):
    try:
        contents = file.file.read()
        db.patients.insert_one(patient.model_dump())
        with open(file.filename, "wb") as f:
            f.write(contents)
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        file.file.close()
    return {"msg": f"file uploaded, filename: {file.filename}"}


# get data from user and add to database
@router.post("/upload-test")
async def upload_file(
    filedata: patient.Patient, db: Database = Depends(database.get_database)
):
    # add the data to the database
    try:
        db["patients"].insert_one(filedata.dict())
    except Exception as e:
        return {"status": "error", "message": str(e)}
    return {"msg": f"file uploading..."}


# get route for downloading files
@router.get("/download")
def download_file():
    print("download file")
    return {"status": "download"}
