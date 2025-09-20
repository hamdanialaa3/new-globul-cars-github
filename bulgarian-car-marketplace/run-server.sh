#!/bin/bash
echo "🚀 Starting Bulgarian Car Marketplace..."
cd "c:\Users\hamda\Desktop\New Globul Cars\bulgarian-car-marketplace"

echo "📦 Building project..."
npm run build

echo "🌐 Starting server on port 3003..."
echo "✅ Server will be available at: http://localhost:3003"
echo "🌍 Network access: http://172.23.96.1:3003"
echo ""
echo "ℹ️  Keep this window open to keep the server running"
echo "❌ Press Ctrl+C to stop the server"
echo ""

node server.js