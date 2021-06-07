const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

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
