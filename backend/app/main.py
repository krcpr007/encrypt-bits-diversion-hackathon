from fastapi import FastAPI, Depends
import uvicorn
from dotenv import load_dotenv
from routes import route
from config import database
from fastapi.middleware.cors import CORSMiddleware
config = load_dotenv(".env")

app = FastAPI(root_path="/api/v1")
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(route.router, dependencies=[Depends(database.get_database)])

app.add_event_handler("startup", database.connect_to_database)
app.add_event_handler("shutdown", database.close_connection)


if __name__ == "__main__":
    print("Starting server.....")
    uvicorn.run("main:app", port=5500, reload=True)
