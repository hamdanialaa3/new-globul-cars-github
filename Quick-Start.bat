@echo off
REM Quick Server Launcher - No Build Required
REM مشغل سريع للخادم - بدون بناء

echo ========================================
echo    Quick Server Launcher
echo ========================================
echo.

cd /d "c:\Users\hamda\Desktop\New Globul Cars\bulgarian-car-marketplace\build"

if not exist "index.html" (
    echo ❌ Build folder not found!
    echo Please run Start-Server.bat first to build the project.
    echo.
    pause
    exit /b 1
)

echo ✅ Build folder found!
echo Starting server on port 3001...
echo.
echo 🌐 Website will be available at: http://localhost:3001
echo 📱 Open this link in your browser
echo.
echo Press Ctrl+C to stop the server
echo.

python -m http.server 3001