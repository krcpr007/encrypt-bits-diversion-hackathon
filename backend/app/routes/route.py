from fastapi import APIRouter, File, UploadFile, Depends, Form
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


@router.get("/download")
def download_file(db: Database = Depends(database.get_database)):
    try:
        patients = db["patients"].find()
        patients_data = [patient.Patient(**data) for data in patients]
    except Exception as e:
        return {"status": "error", "message": str(e)}
    return {"status": "ok", "data": patients_data}
