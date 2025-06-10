// Simple HTTP server for development
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8080;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.mjs': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'font/otf'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // Parse and decode the URL to handle spaces in filenames
    const parsedUrl = url.parse(req.url);
    const decodedPathname = decodeURIComponent(parsedUrl.pathname);
    
    // Handling routes
    let filePath;
    
    // List of routes that should be handled by the SPA
    const spaRoutes = ['/', '/index.html', '/home', '/ipo', '/community', '/products', '/brokers', '/live-news', '/signin', '/signup', '/dashboard', '/admin-dashboard'];
    
    // Check if the path is a route that should be handled by our SPA
    const isRoute = spaRoutes.some(route => {
        return decodedPathname === route || decodedPathname === `${route}/`;
    });
    
    if (isRoute) {
        // For all SPA routes, serve the main index.html
        filePath = path.join(__dirname, 'index.html');
        console.log('Serving SPA for route:', decodedPathname);
    } else {
        // For all other assets, serve the file directly
        filePath = path.join(__dirname, decodedPathname);
    }
    
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    // Handle spaces in file paths for better debugging
    if (filePath.includes(' ')) {
        console.log('Note: File path contains spaces:', filePath);
    }
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // For 404 errors
                console.log('File not found:', filePath);
                res.writeHead(404);
                res.end('File not found');
            } else {
                // Server error
                console.log('Server error:', err.code);
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\nBLUESTOCK Server running at http://localhost:${PORT}/ (redirects to IPO page)\n`);
    console.log('Available Routes:');
    console.log('- IPO (default): http://localhost:' + PORT + '/ipo');
    console.log('- Home:          http://localhost:' + PORT + '/home');
    console.log('- Community:     http://localhost:' + PORT + '/community');
    console.log('- Products:      http://localhost:' + PORT + '/products');
    console.log('- Brokers:       http://localhost:' + PORT + '/brokers');
    console.log('- Live News:     http://localhost:' + PORT + '/live-news');
    console.log('\nPress Ctrl+C to stop the server\n');
});
