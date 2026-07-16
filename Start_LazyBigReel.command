#!/bin/bash

# Go to the directory where this script is located
cd "$(dirname "$0")"

echo "========================================="
echo "🧹 Cleaning up any old ghost servers..."
echo "========================================="
lsof -ti:3000 | xargs kill -9 2>/dev/null

echo "========================================="
echo "📱 Starting LazyBigReel Mac Server (Hidden)..."
echo "========================================="
cd mac-app
node server.js &
MAC_SERVER_PID=$!

echo ""
echo "========================================="
echo "🚀 Starting LazyBigReel Mobile Server..."
echo "========================================="
cd ../phone-app
npx expo start -c

# Clean up the background Mac server when you press Ctrl+C
kill $MAC_SERVER_PID
