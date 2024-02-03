from fastapi import APIRouter, File, UploadFile

router = APIRouter()


@router.get("/")
def read_root():
    return {"Hello": "World"}


@router.get("/health")
def health():
    return {"status": "ok"}


# post route for uploading files
@router.post("/upload")
def upload_file(file: UploadFile = File(...)):
    try:
        contents = file.file.read()
        with open(file.filename, "wb") as f:
            f.write(contents)
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        file.file.close()
    return {"msg": f"file uploaded, filename: {file.filename}"}


@router.post("/upload-test")
def upload_file():
    return {"msg": f"file uploading..."}


# get route for downloading files
@router.get("/download")
def download_file():
    print("download file")
    return {"status": "download"}
