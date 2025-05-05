#!/bin/bash

# SOMA Companion Development Start Script

echo "=========================================="
echo "  SOMA Companion Development Environment  "
echo "=========================================="
echo ""

# Function to check if a port is in use
check_port() {
  if lsof -i:$1 > /dev/null 2>&1; then
    echo "Port $1 is already in use."
    return 0
  else
    return 1
  fi
}

# Kill processes on specific ports if needed
kill_port() {
  if check_port $1; then
    echo "Killing process on port $1..."
    pid=$(lsof -t -i:$1)
    if [ ! -z "$pid" ]; then
      kill -9 $pid 2>/dev/null
      echo "Process on port $1 has been terminated."
    fi
  fi
}

# Check and kill processes on ports 3000 and 5000 if necessary
if [ "$1" == "--force" ]; then
  echo "Force flag detected. Killing any processes on ports 3000 and 5000..."
  kill_port 3000
  kill_port 5000
fi

# Project root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

echo "Root directory: $ROOT_DIR"
echo "Backend directory: $BACKEND_DIR"
echo "Frontend directory: $FRONTEND_DIR"
echo ""

# Start backend server
echo "Starting backend server..."
cd "$BACKEND_DIR" || { echo "Backend directory not found!"; exit 1; }

if check_port 5000; then
  echo "Port 5000 is already in use. Backend server may already be running."
  echo "Use './start-dev.sh --force' to kill the existing process and start fresh."
else
  echo "Starting backend server on port 5000..."
  npm start &
  BACKEND_PID=$!
  echo "Backend server started with PID: $BACKEND_PID"
fi

# Give the backend server a moment to start
sleep 2

# Start frontend development server
echo ""
echo "Starting frontend development server..."
cd "$FRONTEND_DIR" || { echo "Frontend directory not found!"; exit 1; }

if check_port 3000; then
  echo "Port 3000 is already in use. Frontend server may already be running."
  echo "Use './start-dev.sh --force' to kill the existing process and start fresh."
else
  echo "Starting frontend server on port 3000..."
  npm start &
  FRONTEND_PID=$!
  echo "Frontend server started with PID: $FRONTEND_PID"
fi

echo ""
echo "=========================================="
echo "  Development servers are now running     "
echo "  Backend: http://localhost:5000          "
echo "  Frontend: http://localhost:3000         "
echo "=========================================="
echo ""
echo "Press Ctrl+C to stop both servers"

# Trap SIGINT and SIGTERM to clean up child processes
cleanup() {
  echo ""
  echo "Stopping servers..."
  if [ ! -z "$BACKEND_PID" ]; then
    kill -9 $BACKEND_PID 2>/dev/null
    echo "Backend server stopped"
  fi
  if [ ! -z "$FRONTEND_PID" ]; then
    kill -9 $FRONTEND_PID 2>/dev/null
    echo "Frontend server stopped"
  fi
  exit 0
}

trap cleanup SIGINT SIGTERM

# Keep the script running
wait