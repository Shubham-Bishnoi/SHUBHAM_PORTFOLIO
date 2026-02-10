# Frontend (React)

### Run

```bash
cd frontend
npm install
npm run dev
```

### API Base URL

- Uses `VITE_API_BASE_URL` when set.
- Defaults:
  - `DEV`: `http://localhost:8000`
  - `PROD`: same-origin `/api/*` (Vercel serverless functions under repo `api/`).
