## Backend (FastAPI)

### Endpoints

- `GET /api/health` → `{ "ok": true }`
- `POST /api/contact` → validates payload and appends a JSON line to `app/data/contact_messages.jsonl`

### Run

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
# Windows (PowerShell): .venv\\Scripts\\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Storage

- Appends each submission as one JSON object per line to `app/data/contact_messages.jsonl`.

