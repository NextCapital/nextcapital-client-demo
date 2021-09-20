const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

/**
 * To simplify things, rather than building a login page and actual session store, auth for a
 * single user is provided when the server starts as arguments. We use the yargs library to parse
 * them out.
 */
module.exports = yargs(hideBin(process.argv))
  .option('username', {
    alias: 'u',
    type: 'string',
    describe: 'username to use for credential login'
  })
  .option('password', {
    alias: 'p',
    type: 'string',
    describe: 'password to use for credential login'
  })
  .option('jwt', {
    alias: 'j',
    type: 'string',
    describe: 'jwt to use for bearer exchange'
  })
  .option('env', {
    alias: 'e',
    type: 'string',
    describe: 'backend environment to use for authorization',
    default: 'sit'
  })
  .options('port', {
    type: 'integer',
    default: 8080,
    describe: 'the port number for the localhost'
  })
  .option('liveReload', {
    alias: 'r',
    type: 'boolean',
    default: true,
    describe: 'whether to run the reload server, using port 8081'
  })
  .argv;
