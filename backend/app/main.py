from fastapi import FastAPI, File, UploadFile
import uvicorn
from dotenv import load_dotenv
from routes import route
from config import database

config = load_dotenv(".env")

app = FastAPI(root_path="/api/v1")
app.include_router(route.router)

app.add_event_handler("startup", database.connect_to_database)
app.add_event_handler("shutdown", database.close_connection)


if __name__ == "__main__":
    print("Starting server.....")
    uvicorn.run("main:app", port=5500, reload=True)
