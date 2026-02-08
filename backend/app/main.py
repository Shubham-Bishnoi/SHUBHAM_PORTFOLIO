from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes_contact import router as contact_router
from app.api.routes_profile import router as profile_router
from app.core.config import settings


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allow_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"]
)


@app.get("/api/health")
def health() -> dict:
    return {"ok": True}


app.include_router(contact_router)
app.include_router(profile_router)
