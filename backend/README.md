# Backend — FastAPI TODO API

In-memory TODO REST API built with FastAPI.

## Endpoints

| Method   | Endpoint           | Description    |
|----------|--------------------|----------------|
| `GET`    | `/api/todos`       | List all TODOs |
| `POST`   | `/api/todos`       | Create a TODO  |
| `GET`    | `/api/todos/{id}`  | Get a TODO     |
| `PATCH`  | `/api/todos/{id}`  | Update a TODO  |
| `DELETE` | `/api/todos/{id}`  | Delete a TODO  |

## Running with Docker

From the project root:

```bash
docker compose up --build backend
```

The API will be available at `http://localhost:8000`.

## Running locally

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
