# Nextcapital Client Demo

[![NextCapital](https://img.shields.io/badge/NextCapital--%2300a5f6?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA/FBMVEUApfYAAAAApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYApfYk6uC4AAAAU3RSTlMAAJHwVI7ULQcDHcG4FyyxdAE13JQInQLv+G4Kl9AoePvqRynk6UYLnNNrZxrCsxLDsBPPK3Np5UAu51X0YpnSKjbd/oQFGboepg+0cZPEIATmP31l8v0AAAC1SURBVBgZBcGHIsMAFEDReykVWgRtanYYCVp71ay95/v/f3EOMDRcAlVVgZEYLYPCWILA+ERUqgiTU9MpCDOzMVeDaiXqGSiUGvMLLC7F8gqgkjVb7c7q2voGiCp5EZvlre0URRW6vdjZTVBRhe5e7B8kqKiSF3F4dHySoqgkzdbpWf+83QFRuGhcXpFfx80AEG7v7h8e4ek5igzgpRevbwj99w+A7DO+vkGh9oOQ1X//QFXVf8KAFHYrlyAPAAAAAElFTkSuQmCC)](https://www.nextcapital.com)

![GitHub branch checks state](https://img.shields.io/github/checks-status/Nextcapital/nextcapital-client-demo/master) [![Node Version](https://img.shields.io/badge/node--lts-%3E%3D%2018.17.0-brightgreen)](https://nodejs.org/)

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

For authentication, you can either provide a `jwt` bearer assertion to exchange or a valid access token. For example:

- `npm run start -- --solution=nextcapital --jwt=<base64>`
- `npm run start -- --solution=nextcapital --accessToken=<base64>`

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

Example: `npm run start -- --solution=nextcapital --jwt=<base64> --port=9090 --no-live-reload`

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

## Minimal Demo
The [/minimal-demo](minimal-demo) folder contains are example consisting of:

- `package.json` file to describe dependencies needed to build and run the client
- `index.js` to configure and render the client
- `webpack.config.json` webpack config to build the script
- `babel.config.js` configuring webpack will use with babel, needed to transform React JSX
- `index.html` an example html file with minimal client hookup

Together, these files represent the absolute bare minimum of a working integration. This example doesn't work on its own: to get it to function, you'll need to:

- Build a working NextCapital API proxy on your server
- Include the resulting `demo.js` as a script into your existing HTML (and including any other potential HTML changes from our example)
- Modify the `index.jsx` to complete any `TODO` entries.

You can run `npm run build:minimal` at the top-level to build the javascript to the `minimal-demo/dist` folder. The `package.json` is a subset of this repos, so everything will build without issue.

As you can see, Webpack will bundle React and all other dependencies together into a single JavaScript file that can be included in your application (when needed) just as you would any other script.

In general, when `webpack-cli` is installed via `package.json`, you can invoke it as:

```
npx webpack --any --args --can --go --here
```

Ample documentation on webpack, babel, React. JSX, etc... exists elsewhere online if needed.

## Important Notes

Real-life applications should never display a NextCapital-specific login page or use credential login to authenticate to NextCapital.

## Have questions?

Feel free to ask. We will be glad to answer any question.

Please first reference our documentation. We've also added helpful in-code documentation throughout this codebase.

## NOTICE

Copyright (c) 2021 NextCapital Group. All Rights Reserved.
