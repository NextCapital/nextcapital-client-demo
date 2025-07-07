#! /usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { spawn } = require('child_process');

const args = yargs(hideBin(process.argv))
  .option('env', {
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
    type: 'string',
    default: 'nextcapital',
    describe: 'solution to use'
  })
  .option('exchangeToken', {
    type: 'string',
    describe: 'jwt to use for bearer exchange'
  })
  .option('accessToken', {
    type: 'string',
    describe: 'the accessToken for the session. NOTE: Should not be combined with jwt arg'
  })
  .option('liveReload', {
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
if (args.exchangeToken) {
  authParams = `--exchange-token ${args.exchangeToken}`;
} else if (args.accessToken) {
  authParams = `--access-token ${args.accessToken}`;
}

const proxyEndpoint = args.proxyEndpoint ? `--proxyEndpoint ${args.proxyEndpoint}` : '';

// start the actual node/express server
const expressProcess = spawn(
  'node',
  `server/server.js ${authParams} --env ${args.env} --port ${args.port} --live-reload ${args.liveReload}`.split(' '),
  { stdio: 'inherit' }
);

console.log(`\n\nRunning webpack on PID ${webpackProcess.pid} and express on PID ${expressProcess.pid}...`);
console.log('Use Ctrl-C to exit both.\n\n');
