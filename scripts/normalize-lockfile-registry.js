#!/usr/bin/env node

/**
 * This repo is public facing, but `npm install` run from a GS Developer Workspace resolves
 * packages through a corporate Nexus mirror (configured via that environment's `.npmrc`), not
 * the public npm registry. That mirror host ends up baked into the `resolved` fields of
 * `package-lock.json`, which would leak an internal hostname and fail to resolve for partners
 * installing from outside the corporate network if committed as-is.
 *
 * This script rewrites `resolved` to point back at the public registry instead. This is safe
 * for installs made from within the corporate network: npm's default `replace-registry-host`
 * config (`"npmjs"`) already transparently substitutes `registry.npmjs.org` for whatever
 * registry is configured in `.npmrc` when actually fetching, so installs here keep working
 * against the corporate mirror unchanged.
 *
 * Runs automatically via the `postinstall` script, so no manual step is needed after
 * `npm install`/`npm update`.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LOCKFILE_PATH = path.resolve(__dirname, '../package-lock.json');
const PUBLIC_REGISTRY = 'https://registry.npmjs.org/';

const configuredRegistry = execSync('npm config get registry').toString().trim().replace(/\/$/, '');

// nothing to normalize if we're already pointed at the public registry (eg: outside the
// corporate network)
if (`${configuredRegistry}/` === PUBLIC_REGISTRY) {
  process.exit(0);
}

if (!fs.existsSync(LOCKFILE_PATH)) {
  process.exit(0);
}

const lockfile = fs.readFileSync(LOCKFILE_PATH, 'utf8');
const updated = lockfile.split(`"resolved": "${configuredRegistry}/`).join(`"resolved": "${PUBLIC_REGISTRY}`);

if (updated !== lockfile) {
  fs.writeFileSync(LOCKFILE_PATH, updated);
  console.log('Normalized package-lock.json "resolved" URLs back to the public npm registry.');
}
