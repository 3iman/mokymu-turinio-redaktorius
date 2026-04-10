const http = require('http');
const fs = require('fs');
const path = require('path');

const port = parseInt(process.env.PORT || '3456', 10);
const lesson = process.env.LESSON || 'google-sheets-integracija';
const lang = process.env.LANG_SERVE || 'lt';
const dir = path.join(__dirname, 'lessons', lesson, 'output', lang);
const assetsDir = path.join(__dirname, 'assets');

const mimeTypes = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png' };

http.createServer((req, res) => {
  let filePath = path.join(dir, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Try assets directory
      const assetPath = path.join(assetsDir, req.url.replace('/assets/', ''));
      if (req.url.startsWith('/assets/')) {
        return fs.readFile(assetPath, (err3, assetData) => {
          if (err3) { res.writeHead(404); res.end('Not found'); return; }
          const assetExt = path.extname(assetPath);
          res.writeHead(200, { 'Content-Type': mimeTypes[assetExt] || 'application/octet-stream' });
          res.end(assetData);
        });
      }
      // Try directory listing
      fs.readdir(dir, (err2, files) => {
        if (err2) { res.writeHead(500); res.end('Error'); return; }
        const links = files.filter(f => f.endsWith('.html')).map(f => `<li><a href="/${f}">${f}</a></li>`).join('');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<html><body><h2>Illustrations — ${lesson} (${lang})</h2><ul>${links}</ul></body></html>`);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    res.end(data);
  });
}).listen(port, () => console.log(`Serving ${dir} on http://localhost:${port}`));
