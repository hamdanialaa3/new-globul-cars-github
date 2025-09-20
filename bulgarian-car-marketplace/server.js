const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle React Router - serve index.html for all routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`✅ Bulgarian Car Marketplace is running on:`);
  console.log(`   Local:    http://localhost:${port}`);
  console.log(`   Network:  http://172.23.96.1:${port}`);
  console.log('\n🚀 Server is stable and ready to use!');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Server shutting down gracefully...');
  process.exit(0);
});