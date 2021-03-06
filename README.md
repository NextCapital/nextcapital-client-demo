# Nextcapital Client Demo

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

Since this demo reflects that bleeding-edge state of the NC client, it runs against the SIT environment. It currently does not work against UAT or other upper NextCapital environments.

Not all demos will work with all solutions. If a demo is unsupported for the current solution, a message will display when that demo is selected.

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
