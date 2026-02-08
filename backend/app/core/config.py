from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    cors_allow_origins: list[str]


settings = Settings(
    cors_allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]
)
