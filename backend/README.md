# Backend — FastAPI TODO API

TODO REST API built with FastAPI and SQLite (via SQLAlchemy).

## Endpoints

| Method   | Endpoint           | Description    |
|----------|--------------------|----------------|
| `GET`    | `/api/todos`       | List all TODOs |
| `POST`   | `/api/todos`       | Create a TODO  |
| `GET`    | `/api/todos/{id}`  | Get a TODO     |
| `PATCH`  | `/api/todos/{id}`  | Update a TODO  |
| `DELETE` | `/api/todos/{id}`  | Delete a TODO  |

## Database

The SQLite database is stored at `data/todos.db` and is created automatically on startup. Tables are managed by SQLAlchemy via `Base.metadata.create_all()`.

To query the database offline:

```bash
python query_db.py
python query_db.py "SELECT * FROM todos WHERE completed = 1"
```

## Running with Docker

From the project root:

```bash
docker compose up --build backend
```

The API will be available at `http://localhost:8000`. The database is persisted via a bind mount at `backend/data/`.

## Running locally

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Project Structure

- `main.py` - FastAPI app with CRUD endpoints
- `models.py` - SQLAlchemy model and Pydantic schemas
- `database.py` - SQLAlchemy engine, session, and dependency
- `query_db.py` - Offline database query utility
- `data/todos.db` - SQLite database (auto-created, gitignored)
