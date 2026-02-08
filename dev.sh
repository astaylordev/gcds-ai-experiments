#!/bin/bash
set -e

cleanup() {
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
}
trap cleanup EXIT

cd "$(dirname "$0")"

# Install dependencies if needed
if ! backend/.venv/bin/python -c "import uvicorn; import sqlalchemy" &>/dev/null; then
  rm -rf backend/.venv
  python -m venv backend/.venv
  backend/.venv/bin/python -m pip install -r backend/requirements.txt
fi
[ -d node_modules ] || npm install

# Start backend
backend/.venv/bin/python -m uvicorn main:app --host 0.0.0.0 --port 8000 --app-dir backend &
BACKEND_PID=$!

# Start frontend
npm run dev &
FRONTEND_PID=$!

wait
