# Nextcapital Client Demo

A simple application that demonstrates how to integrate with the NextCapital client.

## Getting Started

Please read the Quick Start Guide for the NextCapital Client before getting started.

Simply run `npm install` to install all packages. Once everything is installed, you can run
`npm run start` to start the dev server.

Once the server is running, open `http://localhost:8080` in a browser to view the application.

## Specifying a Solution
By default, the `nextcapital` solution will be used. To use a different solution (eg: `example`), specify one with the `start` command like so:

```
npm run start -- --solution=example
```

Not all demos will work with all solutions. If a demo is unsupported for the current solution, a message will display when that demo is selected.

## Codebase Overview

- The main entry point of the application is `js/index.jsx`.
  - This is where the application is configured and first rendered.
- The main React component for the application is `js/DemoApplication.jsx`.
  - This is also where all of the routes for the application are defined.
- Each demo lives within the `js/pages` folder.
  - These demos use shared React components from the `js/components` folder.
- The main HTML page the application uses is `static/index.html`.
- The webpack config (`webpack.config.js`) defines how the app is built, and also sets up the (required) CORS proxy.

## Important Notes

To help make this demo more useful before a full auth integration is setup, this app makes use of
a login page / credential login. Real-life applications should never display a login page or use
credential login. That fact that we do so here means that the authentication integration here is
significantly more complex than it would be in an actual application. See documentation for more.

## Have questions?

Feel free to ask. We will be glad to answer any question.

### Documentation

Additional documentation should be provided by NextCapital with this project.

We've also added helpful in-code documentation throughout this codebase.

## NOTICE

Copyright Notice
Copyright (c) 2020 NextCapital Group. All Rights Reserved.

THIS IS UNPUBLISHED CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF NEXTCAPITAL GROUP.

The copyright notice above does not evidence any actual or intended publication
of such source code.

Copyright (c) 2020
NextCapital Group
All Rights Reserved.

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

CONFIDENTIAL AND PROPRIETARY NOTICE
This source code is unpublished confidential and proprietary information constituting,
or derived under license from NextCapital Group's software.
