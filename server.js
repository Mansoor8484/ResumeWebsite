const http = require('http');
const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname);
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  const requestUrl = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const safePath = path.normalize(path.join(publicDir, requestUrl));

  if (!safePath.startsWith(publicDir)) {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('Forbidden');
  }

  fs.readFile(safePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      return res.end('Not found');
    }

    const ext = path.extname(safePath).toLowerCase();
    res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
    res.end(data);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Resume website available at http://localhost:${port}`);
});
