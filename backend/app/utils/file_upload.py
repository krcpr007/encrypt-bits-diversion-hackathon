from fastapi import UploadFile, HTTPException
import os


def save_upload_file(upload_file: UploadFile):
    temp_dir = "temp"
    try:
        contents = upload_file.file.read()
        os.makedirs(temp_dir, exist_ok=True)
        with open(os.path.join(temp_dir, upload_file.filename), "wb") as f:
            f.write(contents)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        upload_file.file.close()
