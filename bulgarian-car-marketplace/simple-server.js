const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('🚀 Starting Bulgarian Car Marketplace Server...');

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'Bulgarian Car Marketplace',
    timestamp: new Date().toISOString()
  });
});

// Catch all handler for React Router
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/cars', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/sell-car', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Default fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('\n' + '='.repeat(50));
  console.log('✅ BULGARIAN CAR MARKETPLACE READY!');
  console.log('='.repeat(50));
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`🌐 http://127.0.0.1:${PORT}`);
  console.log(`🕒 ${new Date().toLocaleString()}`);
  console.log('='.repeat(50));
  console.log('🔗 Available pages:');
  console.log('   • Home: /');
  console.log('   • Cars: /cars');
  console.log('   • Sell: /sell-car');
  console.log('   • Health: /health');
  console.log('='.repeat(50));
  console.log('ℹ️  Keep this window open');
  console.log('🛑 Press Ctrl+C to stop');
  console.log('='.repeat(50) + '\n');
});

server.on('error', (err) => {
  console.error('❌ Server error:', err.message);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

module.exports = app;