const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3003;

// مكافحة أخطاء MIME
app.use(express.static(path.join(__dirname, 'build'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json');
    }
  }
}));

// إعدادات الأمان المحسنة
app.use(helmet({
  contentSecurityPolicy: false
}));

// إعدادات CORS محسنة
app.use(cors({
  origin: [`http://localhost:${PORT}`, 'http://127.0.0.1:' + PORT],
  credentials: true
}));

// معالجة JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files with better caching
app.use(express.static(path.join(__dirname, 'build'), {
  maxAge: '1d',
  etag: false
}));

// API routes placeholder
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'Bulgarian Car Marketplace',
    timestamp: new Date().toISOString()
  });
});

// معالجة React Router - يجب أن تكون الأخيرة
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// معالجة الأخطاء
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// معالجة الصفحات غير الموجودة
app.use((req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

let server;

const startServer = () => {
  server = app.listen(PORT, '0.0.0.0', () => {
    console.log('\n🟢 ================================');
    console.log('✅ Bulgarian Car Marketplace READY!');
    console.log('🌐 Local:   http://localhost:' + PORT);
    console.log('🌍 Network: http://172.23.96.1:' + PORT);
    console.log('🕒 Started at:', new Date().toLocaleString());
    console.log('================================\n');
    console.log('ℹ️  Press Ctrl+C to stop the server');
    console.log('🔄 Server will restart on file changes\n');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️  Port ${PORT} is in use, trying port ${PORT + 1}...`);
      PORT = PORT + 1;
      setTimeout(startServer, 1000);
    } else {
      console.error('❌ Server error:', err);
    }
  });
};

// معالجة الإغلاق بشكل صحيح
process.on('SIGTERM', () => {
  console.log('\n🛑 SIGTERM received, shutting down gracefully...');
  if (server) {
    server.close(() => {
      console.log('✅ Server closed successfully');
      process.exit(0);
    });
  }
});

process.on('SIGINT', () => {
  console.log('\n🛑 SIGINT received, shutting down gracefully...');
  if (server) {
    server.close(() => {
      console.log('✅ Server closed successfully');
      process.exit(0);
    });
  }
});

// معالجة الأخطاء غير المعالجة
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// بدء الخادم
startServer();

module.exports = app;