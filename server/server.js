const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const livereload = require('livereload');

const ApiProxy = require('./proxy');
const Session = require('./session');
const args = require('./args');

if (!(args.jwt || (args.username && args.password))) {
  console.error('please provide username/password or jwt');
  process.exit(1);
}

// Define the express app
const app = express();
app.disable('x-powered-by');

// Define overall middleware
app.use(favicon(path.join(__dirname, '../static/favicon.png'))); // see serve-favicon package docs
app.use(cookieParser());

// Define routes
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use('/api', Session.middleware.bind(Session), ApiProxy);

// Start the server
app.listen(8080, () => console.log('server ready on port 8080'));
