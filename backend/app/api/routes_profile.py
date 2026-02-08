import json
from pathlib import Path

from fastapi import APIRouter, HTTPException


router = APIRouter()


@router.get("/api/profile")
def get_profile() -> dict:
    profile_path = Path(__file__).resolve().parents[1] / "data" / "profile.json"
    try:
        return json.loads(profile_path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise HTTPException(status_code=500, detail="Profile data file not found") from exc
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=500, detail="Profile data file is invalid") from exc

