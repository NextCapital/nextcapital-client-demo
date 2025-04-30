const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

/**
 * To simplify things, rather than building a login page and actual session store, auth for a
 * single user is provided when the server starts as arguments. We use the yargs library to parse
 * them out.
 */
module.exports = yargs(hideBin(process.argv))
  .option('exchangeToken', {
    type: 'string',
    describe: 'jwt to use for bearer exchange'
  })
  .option('accessToken', {
    type: 'string',
    describe: 'the accessToken for the session. NOTE: Should not be combined with jwt arg'
  })
  .option('env', {
    type: 'string',
    describe: 'backend environment to use for authorization',
    default: 'sit'
  })
  .options('port', {
    type: 'integer',
    default: 8080,
    describe: 'the port number for the localhost'
  })
  .options('proxyEndpoint', {
    type: 'string',
    describe: 'the proxyEndpoint. NOTE: When not provided defaults to proxyEndpoint from the environments.json file'
  })
  .option('liveReload', {
    type: 'boolean',
    default: true,
    describe: 'whether to run the reload server, using port 8081'
  })
  .argv;
