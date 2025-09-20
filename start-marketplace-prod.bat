@echo off
REM One-click start for PROD (Express serving build with SPA fallback)
cd /d "c:\Users\hamda\Desktop\New Globul Cars\bulgarian-car-marketplace"
echo [1/2] Building production bundle...
call npm run build || goto :error

echo [2/2] Starting Express server on http://localhost:3000 ...
set PORT=3000
node server.js

goto :eof
:error
echo Build failed. Check errors above.
pause
exit /b 1

app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => res.status(204).end());