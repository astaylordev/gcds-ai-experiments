# GCDS AI Experiments

A React frontend using the [GC Design System](https://design-system.alpha.canada.ca/) with a FastAPI TODO backend.

Built with [Vite](https://vite.dev/) + [React](https://react.dev/) + [@cdssnc/gcds-components-react](https://github.com/cds-snc/gcds-components) + [FastAPI](https://fastapi.tiangolo.com/).

## Running with Docker

```bash
docker compose up --build
```

The app will be available at `http://localhost`. Nginx serves the frontend and proxies `/api` requests to the FastAPI backend.

To stop:

```bash
docker compose down
```

## Running locally (development)

### Frontend

```bash
npm install
npm run dev
```

The Vite dev server starts at `http://localhost:5173` and proxies `/api` requests to `http://localhost:8000`.

### Backend

```bash
python3 -m venv backend/.venv
source backend/.venv/bin/activate
pip install -r backend/requirements.txt
cd backend && uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

## Build for Production

```bash
npm run build
npm run preview
```
