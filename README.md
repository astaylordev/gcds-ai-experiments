# GCDS AI Experiments

A React frontend using the [GC Design System](https://design-system.alpha.canada.ca/) with a FastAPI TODO backend.

Built with [Vite](https://vite.dev/) + [React](https://react.dev/) + [@cdssnc/gcds-components-react](https://github.com/cds-snc/gcds-components) + [FastAPI](https://fastapi.tiangolo.com/) + [SQLAlchemy](https://www.sqlalchemy.org/) + SQLite.

## Features

- **Bilingual Support**: Full English/French language toggle
- **TODO Management**: Create, read, update, and delete todos
- **GCDS Components**: Uses Government of Canada Design System components
- **API Integration**: React frontend connected to FastAPI backend
- **SQLite Persistence**: Todos are stored in a SQLite database via SQLAlchemy

## Quick Start

The easiest way to run both frontend and backend together:

```bash
./dev.sh
```

This installs dependencies (if needed) and starts the frontend at `http://localhost:5173` and the backend at `http://localhost:8000`.

## Running with Docker

```bash
docker compose up --build
```

The app will be available at `http://localhost:5173`. Nginx serves the frontend and proxies `/api` requests to the FastAPI backend. The database is persisted via a bind mount at `backend/data/`.

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

The API will be available at `http://localhost:8000`. The SQLite database is created automatically at `backend/data/todos.db` on first run.

## Build for Production

```bash
npm run build
npm run preview
```

## TODO API Endpoints

The FastAPI backend provides the following endpoints:

- `GET /api/todos` - List all todos
- `POST /api/todos` - Create a new todo
- `GET /api/todos/{id}` - Get a specific todo
- `PATCH /api/todos/{id}` - Update a todo
- `DELETE /api/todos/{id}` - Delete a todo

## Database

Todos are stored in a SQLite database at `backend/data/todos.db`. The database and tables are created automatically on startup.

To query the database offline:

```bash
# Show all todos
python backend/query_db.py

# Run a custom SQL query
python backend/query_db.py "SELECT * FROM todos WHERE completed = 1"
```

When running via Docker, query inside the container:

```bash
docker compose exec backend python query_db.py
```

## Frontend Components

- `TodoList` - Main component that fetches and displays all todos
- `TodoForm` - Form component for adding new todos
- `TodoItem` - Individual todo item with toggle and delete functionality

All components support bilingual content (English/French).
