#! /usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { spawn } = require('child_process');

const args = yargs(hideBin(process.argv))
  .option('env', {
    alias: 'e',
    type: 'string',
    default: 'sit',
    describe: 'nextcapital environment to use'
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
  .option('solution', {
    alias: 's',
    type: 'string',
    default: 'nextcapital',
    describe: 'solution to use'
  })
  .option('jwt', {
    alias: 'j',
    type: 'string',
    describe: 'jwt to use for bearer exchange'
  })
  .option('accessToken', {
    alias: 'a',
    type: 'string',
    describe: 'the accessToken for the session. NOTE: Should not be combined with jwt arg'
  })
  .option('liveReload', {
    alias: 'r',
    type: 'boolean',
    default: true,
    describe: 'whether to run the reload server, using port 8081'
  })
  .argv;

// start a watching webpack process
const webpackProcess = spawn(
  `npx`,
  `webpack --env env=${args.env} --env solution=${args.solution} --watch --progress`.split(' '),
  { stdio: 'inherit' }
);

let authParams = '';
if (args.jwt) {
  authParams = `--jwt ${args.jwt}`
} else if (args.accessToken) {
  authParams = `--accessToken ${args.accessToken}`
}

const proxyEndpoint = args.proxyEndpoint ? `--proxyEndpoint ${args.proxyEndpoint}` : '';

// start the actual node/express server
const expressProcess = spawn(
  'node',
  `server/server.js ${authParams} ${proxyEndpoint} --env ${args.env} --port ${args.port} --live-reload ${args.liveReload}`.split(' '),
  { stdio: 'inherit' }
);

console.log(`\n\nRunning webpack on PID ${webpackProcess.pid} and express on PID ${expressProcess.pid}...`);
console.log('Use Ctrl-C to exit both.\n\n');
