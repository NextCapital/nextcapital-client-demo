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
