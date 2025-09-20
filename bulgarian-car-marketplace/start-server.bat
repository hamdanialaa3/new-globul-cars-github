@echo off
setlocal enabledelayedexpansion
echo ==================================================
echo  Starting Bulgarian Car Marketplace (Production)
echo ==================================================
cd /d "c:\Users\hamda\Desktop\New Globul Cars\bulgarian-car-marketplace"

REM Build the React app
echo.
echo [1/2] Building project...
call npm run build || goto :error

REM Use PORT if provided, otherwise default to 3000
if "%PORT%"=="" (
	set PORT=3000
)

REM Start Express server with SPA fallback (supports /login and all routes)
echo.
echo [2/2] Starting Express server on port %PORT% ...
node server.js

goto :eof

:error
echo.
echo Build failed. Please check errors above.
pause
exit /b 1

:eof
echo.
echo Server stopped.
pause
endlocal