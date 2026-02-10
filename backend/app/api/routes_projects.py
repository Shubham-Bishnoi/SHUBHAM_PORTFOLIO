import json
from pathlib import Path

from fastapi import APIRouter, HTTPException


router = APIRouter()


def _load_profile() -> dict:
    profile_path = Path(__file__).resolve().parents[1] / "data" / "profile.json"
    try:
        return json.loads(profile_path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise HTTPException(status_code=500, detail="Profile data file not found") from exc
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=500, detail="Profile data file is invalid") from exc


@router.get("/api/projects")
def get_projects() -> list[dict]:
    profile = _load_profile()
    projects = profile.get("projects", [])
    return [
        {
            "slug": p.get("slug", ""),
            "name": p.get("name", ""),
            "category": p.get("category", ""),
            "dateLabel": p.get("dateLabel", ""),
            "short": p.get("short", ""),
            "thumbnail": p.get("thumbnail", ""),
        }
        for p in projects
    ]


@router.get("/api/projects/{slug}")
def get_project(slug: str) -> dict:
    profile = _load_profile()
    projects = profile.get("projects", [])
    for p in projects:
        if p.get("slug") == slug:
            return p
    raise HTTPException(status_code=404, detail="Not found")
