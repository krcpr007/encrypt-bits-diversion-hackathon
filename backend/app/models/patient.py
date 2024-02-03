from pydantic import BaseModel


class Patient(BaseModel):
    name: str
    key: str
    image: str
