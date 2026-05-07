const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const livereload = require('livereload');

const ApiProxy = require('./proxy');
const Session = require('./session');
const args = require('./args');

// ensure the proper arguments are present
if (!(args.exchangeToken || args.accessToken)) {
  console.error('please provide exchange or access token');
  process.exit(1);
}

// Define the express app
const app = express();
app.disable('x-powered-by');

// Define overall middleware
app.use(favicon(path.join(__dirname, '../static/favicon.png'))); // see serve-favicon package docs
app.use(cookieParser());

// Serve index.html with livereload script injected when live reload is enabled.
// This must be registered before express.static so it handles '/' first.
const LIVERELOAD_SCRIPT = '<script src="http://localhost:8081/livereload.js?snipver=1" defer></script>';

app.get('/', (req, res) => {
  const indexPath = path.resolve(__dirname, '../dist/index.html');
  let html = fs.readFileSync(indexPath, 'utf8');

  if (args.liveReload) {
    html = html.replace('</head>', `    ${LIVERELOAD_SCRIPT}\n  </head>`);
  }

  res.type('html').send(html);
});

// Setup static assets
app.use(express.static(path.resolve(__dirname, '../dist')));

// The actual API proxy. `Session.middleware` will acquire a token on the first request before
// handing control over the to proxy.
app.use('/api', Session.middleware.bind(Session), ApiProxy);

// Start the server
app.listen(args.port, () => console.log(`server ready on port ${args.port}`));

// Start LiveReload
if (args.liveReload) {
  console.log('Livereload is watching files on port 8081...');
  const liveReloadServer = livereload.createServer({ delay: 100, port: 8081 });
  liveReloadServer.watch([path.resolve(__dirname, '../dist')]);
}
