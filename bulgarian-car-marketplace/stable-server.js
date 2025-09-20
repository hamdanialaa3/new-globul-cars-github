const express = require('express');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = 3000;

// إعدادات أساسية للخادم
app.use(express.static(path.join(__dirname, 'build'), {
  maxAge: '1d',
  index: 'index.html'
}));

// API للصحة
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'Bulgarian Car Marketplace',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// معالجة React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// معالجة الأخطاء
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// بدء الخادم مع معالجة محسنة
function startServer() {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log('\n' + '='.repeat(60));
    console.log('🟢 BULGARIAN CAR MARKETPLACE - SERVER READY!');
    console.log('='.repeat(60));
    console.log(`✅ Local Access:    http://localhost:${PORT}`);
    console.log(`✅ Local IP:        http://127.0.0.1:${PORT}`);
    console.log(`🌍 Network Access:  http://0.0.0.0:${PORT}`);
    console.log(`🕒 Started At:      ${new Date().toLocaleString()}`);
    console.log('='.repeat(60));
    console.log('📋 Available Pages:');
    console.log('   • Home Page:     /');
    console.log('   • Cars Page:     /cars');
    console.log('   • Sell Car:      /sell-car');
    console.log('   • Health Check:  /api/health');
    console.log('='.repeat(60));
    console.log('ℹ️  Server is persistent - it will NOT shut down automatically');
    console.log('🛑 To stop: Press Ctrl+C');
    console.log('🔄 Auto-restart: Enabled');
    console.log('='.repeat(60) + '\n');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️  Port ${PORT} is busy. Trying to kill existing process...`);
      
      // قتل العمليات على هذا المنفذ
      const killCmd = process.platform === 'win32' 
        ? `netstat -ano | findstr :${PORT} && for /f "tokens=5" %a in ('netstat -ano ^| findstr :${PORT}') do taskkill /PID %a /F`
        : `lsof -ti:${PORT} | xargs kill -9`;
      
      const child = spawn('cmd', ['/c', killCmd], { shell: true });
      
      child.on('close', () => {
        console.log('🔄 Retrying server start...');
        setTimeout(startServer, 2000);
      });
    } else {
      console.error('❌ Server Error:', err);
      process.exit(1);
    }
  });

  // منع الإغلاق التلقائي
  process.on('SIGTERM', () => {
    console.log('\n⚠️  SIGTERM received - but server will stay alive!');
  });

  process.on('SIGINT', () => {
    console.log('\n🛑 Manual shutdown requested...');
    server.close(() => {
      console.log('✅ Server closed successfully');
      process.exit(0);
    });
  });

  // معالجة الأخطاء العامة
  process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    console.log('🔄 Restarting server...');
    setTimeout(startServer, 1000);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection:', reason);
    console.log('🔄 Server continues running...');
  });

  return server;
}

// بدء الخادم
console.log('🚀 Initializing Bulgarian Car Marketplace Server...');
startServer();

module.exports = app;