const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'build', req.url === '/' ? 'index.html' : req.url);

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File doesn't exist, serve index.html for SPA
      filePath = path.join(__dirname, 'build', 'index.html');
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
        return;
      }

      const ext = path.extname(filePath);
      const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml'
      }[ext] || 'text/plain';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log('🚀 Bulgarian Car Marketplace Server Running!');
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`🕒 ${new Date().toLocaleString()}`);
  console.log('='.repeat(50));
  console.log('🔗 Available pages:');
  console.log('   • Home: /');
  console.log('   • Cars: /cars');
  console.log('   • Login: /login');
  console.log('='.repeat(50));
  console.log('ℹ️  Server is running...');
  console.log('🛑 Press Ctrl+C to stop');
});