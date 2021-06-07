#! /usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { spawn } = require('child_process');

const args = yargs(hideBin(process.argv))
  .option('env', {
    alias: 'e',
    type: 'string',
    default: 'sit',
    describe: 'nextcapital environment to use (sit or development)'
  })
  .option('solution', {
    alias: 's',
    type: 'string',
    default: 'nextcapital',
    describe: 'solution to use'
  })
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

const webpackProcess = spawn(
  `npx`,
  `webpack --env env=${args.env} --env solution=${args.solution}`.split(' '),
  { stdio: 'inherit' }
);

const authParams = args.jwt ?
  `--jwt ${args.jwt}` :
  `--username ${args.username} --password ${args.password}`

const expressProcess = spawn(
  'node',
  `server/server.js ${authParams}`.split(' '),
  { stdio: 'inherit' }
);

console.log(`\n\nRunning webpack on PID ${webpackProcess.pid} and express on PID ${expressProcess.pid}...`);
console.log('Use Ctrl-C to exit both.\n\n');

