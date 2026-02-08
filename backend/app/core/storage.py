import json
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4

from app.models.contact import ContactCreate


DATA_DIR = Path(__file__).resolve().parents[1] / "data"
JSONL_PATH = DATA_DIR / "contact_messages.jsonl"


def append_contact_message(payload: ContactCreate) -> str:
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    message_id = str(uuid4())
    ts = datetime.now(timezone.utc).isoformat()

    record = {
        "id": message_id,
        "ts": ts,
        "name": payload.name,
        "email": payload.email,
        "message": payload.message,
    }

    with JSONL_PATH.open("a", encoding="utf-8") as f:
        f.write(json.dumps(record, ensure_ascii=False))
        f.write("\n")

    return message_id

