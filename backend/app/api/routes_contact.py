from fastapi import APIRouter

from app.core.storage import append_contact_message
from app.models.contact import ContactCreate


router = APIRouter()


@router.post("/api/contact")
def create_contact(payload: ContactCreate) -> dict:
    message_id = append_contact_message(payload)
    return {"ok": True, "id": message_id}

