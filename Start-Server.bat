@echo off
REM Bulgarian Car Marketplace - Server Launcher
REM مشغل الخادم لسوق السيارات البلغاري

echo ========================================
echo    Bulgarian Car Marketplace Server
echo ========================================
echo.

cd /d "c:\Users\hamda\Desktop\New Globul Cars\bulgarian-car-marketplace"

echo [1/3] Building the project...
echo.
npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo.
echo ✅ Build completed successfully!
echo.

echo [2/3] Starting Python HTTP Server on port 3001...
echo.
cd build
python -m http.server 3001

echo.
echo ✅ Server started successfully!
echo 🌐 Access the website at: http://localhost:3001
echo.
pause