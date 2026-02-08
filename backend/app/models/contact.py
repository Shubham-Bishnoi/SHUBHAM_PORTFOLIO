from pydantic import BaseModel, EmailStr, Field


class ContactCreate(BaseModel):
    name: str = Field(min_length=2)
    email: EmailStr
    message: str = Field(min_length=10)

