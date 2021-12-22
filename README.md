# Nextcapital Client Demo

[![NextCapital](https://img.shields.io/badge/NextCapital--%2300a5f6?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA/FBMVEUApfYAAAAApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYk6uC4AAAAU3RSTlMAAJHwVI7ULQcDHcG4FyyxdAE13JQInQLv+G4Kl9AoePvqRynk6UYLnNNrZxrCsxLDsBPPK3Np5UAu51X0YpnSKjbd/oQFGboepg+0cZPEIATmP31l8v0AAAC1SURBVBgZBcGHIsMAFEDReykVWgRtanYYCVp71ay95/v/f3EOMDRcAlVVgZEYLYPCWILA+ERUqgiTU9MpCDOzMVeDaiXqGSiUGvMLLC7F8gqgkjVb7c7q2voGiCp5EZvlre0URRW6vdjZTVBRhe5e7B8kqKiSF3F4dHySoqgkzdbpWf+83QFRuGhcXpFfx80AEG7v7h8e4ek5igzgpRevbwj99w+A7DO+vkGh9oOQ1X//QFXVf8KAFHYrlyAPAAAAAElFTkSuQmCC)](https://www.nextcapital.com)

![GitHub branch checks state](https://img.shields.io/github/checks-status/Nextcapital/nextcapital-client-demo/master) [![Node Version](https://img.shields.io/badge/node--lts-%3E%3D%2016.13.0-brightgreen)](https://nodejs.org/)

A simple application that demonstrates how to integrate with the NextCapital client.

👉 NOTE: This repo is public! 👈

## Full Documentation

Full documentation for the `@nextcapital/client` package can be found at the wiki:

https://github.com/nextcapital/nextcapital-client-demo/wiki

## Getting Started

Please read the [Quick Start Guide](https://github.com/NextCapital/nextcapital-client-demo/wiki/Quick-Start-Guide) for the NextCapital Client before getting started.

Simply run `npm install` to install all packages. Once everything is installed, you can run
`npm run start` to start the dev server (see below for required arguments).

Once the server is running, open `http://localhost:8080` in a browser to view the application.

## Specifying a Solution and Authentication

When starting the demo application, you will need to provide both params for proxy authentication and a solution to use.

For authentication, you can either provide a `jwt` bearer assertion to exchange or a `username`/`password` combo. For example:

- `npm run start -- --solution=nextcapital --username=example@email.com --password=hunter2`
- `npm run start -- --solution=nextcapital --jwt=<base64>`

By default, the `nextcapital` solution will be used. To use a different solution (eg: `example`), specify one with the `start`.

Additionally, you may specify an environment with `env`:

- `npm run start -- --solution=nextcapital --jwt=<base64> --env=uat`

By default, the `sit` environment will be used. See [server/environments.json](server/environments.json) for a list available environments.

Not all demos will work with all solutions. If a demo is unsupported for the current solution, a message will display when that demo is selected.

## Specifying the Localhost Port and Reload Watching

When starting the demo application, there are additional optional params for specifying the port number and whether to live reload.

- `--port=9000` -> the `nextcapital-client-demo` server will now start on `localhost:9000`.
  - Defaults to port `8080`
- `--no-live-reload` -> `nextcapital-client-demo` skips having the build watch for changes with auto reload
  - The live reload server runs on port 8081 if started

Example: `npm run start -- --solution=nextcapital --username=example@email.com --password=gatherer-2 --port=9090 --no-live-reload`

## Codebase Overview

### Client

- The main entry point of the application is `js/index.jsx`.
  - This is where the application is configured and first rendered.
- The main React component for the application is `js/DemoApplication.jsx`.
  - This is also where all of the routes for the application are defined.
- Each demo lives within the `js/pages` folder.
  - These demos use shared React components from the `js/components` folder.
- The main HTML page the application uses is `static/index.html`.
- The webpack config (`webpack.config.js`) defines how the app is built

### Server

- The demo express server lives at `server/server.js`
- The API proxy exists at `server/proxy.js`
- The minimal session handling live at `server/session.js`

## Important Notes

To help make this demo more useful before a full auth integration is setup, this app allows credential-based login. Real-life applications should never display a NextCapital-specific login page or use credential login to authenticate to NextCapital.

## Have questions?

Feel free to ask. We will be glad to answer any question.

Please first reference our documentation. We've also added helpful in-code documentation throughout this codebase.

## NOTICE

Copyright (c) 2021 NextCapital Group. All Rights Reserved.
