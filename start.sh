#!/bin/bash

# Webtelligence Quick Start Script
# Run this to start both frontend and backend

echo "🚀 Webtelligence Quick Start"
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Starting MongoDB..."
    # Uncomment the line below if you want to auto-start MongoDB
    # mongod --dbpath /path/to/your/data &
fi

echo "📦 Installing backend dependencies..."
cd server
if [ ! -d "node_modules" ]; then
    npm install
fi

echo ""
echo "🔧 Starting backend server..."
npm run dev &
BACKEND_PID=$!

echo ""
echo "⏳ Waiting for backend to start..."
sleep 3

echo ""
echo "🌐 Starting frontend server..."
cd ../client

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "Using Python HTTP server..."
    python3 -m http.server 8080 &
    FRONTEND_PID=$!
elif command -v python &> /dev/null; then
    echo "Using Python HTTP server..."
    python -m http.server 8080 &
    FRONTEND_PID=$!
elif command -v npx &> /dev/null; then
    echo "Using npx serve..."
    npx serve -p 8080 &
    FRONTEND_PID=$!
else
    echo "❌ No suitable HTTP server found. Install Python or Node.js serve package."
    kill $BACKEND_PID
    exit 1
fi

echo ""
echo "✅ Servers are running!"
echo ""
echo "📍 Backend:  http://localhost:4000"
echo "📍 Frontend: http://localhost:8080"
echo "📍 Admin:    http://localhost:4000/admin"
echo ""
echo "Press Ctrl+C to stop all servers..."

# Wait for user interrupt
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
