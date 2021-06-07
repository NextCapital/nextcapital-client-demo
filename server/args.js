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
  .argv;
