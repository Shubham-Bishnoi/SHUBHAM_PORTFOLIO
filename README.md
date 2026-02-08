## Portfolio Monorepo

This repo contains two apps:

- `backend/`: FastAPI API server (health + contact form submission stored as JSONL)
- `frontend/`: React (Vite) site with a `/contact` page inspired by Adham Dannaway’s contact layout

### Dev

Backend:

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
# Windows (PowerShell): .venv\\Scripts\\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend posts to `VITE_API_BASE_URL` (defaults to `http://localhost:8000`).

