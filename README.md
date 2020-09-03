# External API Demo

A demo application that shows the potential of a NextCapital client within partner applications. This demo showcases three patterns:

* Embedding full UIs directly into a parent application, such as our document vault and our plan implementation flow
* Embedding UI components into a parent application, such as forecast and advice charts
* Integrating with our API client for raw data access (demo only for now)

## Getting Started

This demo assumes familiarity with:

- Javascript (ES6)
- NodeJS and npm
- React
- `react-router`
- `webpack` and `babel`
- Promises and `async/await` syntax

To get started, simply run `npm install`. Once everything is installed, you can run:

- `npm run start:sit` to start the local dev server against NextCapital SIT
- `npm run start:uat` to start the local dev server against NextCapital UAT

Once the server is running, open `http://localhost:8080` in a browser to view the application.

## Codebase Overview

- The main entry point of the application is `js/index.jsx`.
  - This is where the application is configured and first rendered.
- The main React component for the application is `js/DemoApplication.jsx`.
- This is also where all of the routes for the application are defined.
- Each demo lives within the `js/pages` folder.
  - These demos use shared React components from the `js/components` folder.
- The main HTML page the application uses is `static/index.html`.
- The webpack config (`webpack.config.js`) defines how the app is built, and also sets up the (required) CORS proxy.
- The embedded UIs require CSS. This can be found in the `static/nextcapital-styles` folder.
  - This should not be modified, per the copyright notice in the folder.
- The main nextcapital client javascript lives in the `nextcapital-client` folder. Eventually, this (and the aforementioned CSS) would be delivered via an alternate means. The current setup is the easiest delivery method for now.
  - This should not be modified, per the copyright notice in the folder.

## NextCapital Client

### Configuration

The NextCapital client needs to be configured before it can be used. See `js/index.js` for an example.

### Authentication/Session

The client needs to be authenticated before it can do anything. See how the session is handled in `js/DemoApplication.jsx` and `js/pages/LoginPage.jsx`.

### Embedded UIs

The client currently has several embedded UIs available. See appropriate pages in `js/pages` for examples on how to use them. These demos range from full-fledged applications to something as simple as a chart.

Notably, these UIs are all built in NextCapital's in-house application framework. This framework is "routerless", meaning it can navigate pages without needing a URL defined. As such, while the overall application demo needs routes defined, the embedded UIs do not. This makes it much easier to embed our UI within another application, as it does not need to worry about defining routes.

## Important Notes

- Both this demo application and the client it consumes were built by a single developer a few days.
  - **Nothing should be considered finalized or production-ready.**
  - Any production-ready client would likely have a different interface.
  - Thus, it is unwise to use this client for anything other than a proof-of-concept
- This demo seeks only to show the possibilities of what NextCapital can do with a client today. The client was created specifically for this demo. Additional demos and changes are possible upon request.
  - Much of this content would likely NOT be available on a production-ready client
  - We are unlikely to provide raw API access, as some demos here do. Instead, we would provide indirect access via an API like `getProfileData`.
- Some demos are for retail users, and others are for workplace users. Demos intended for one use case will still "work" for a user designed for the other, but note that this isn't a supported use case.
  - This demo is being shared between multiple partners
  - Some partners use retail, and others workplace
- Authentication currently uses username/password or jwt login. Overall, expect the authentication lifecycle to be refactored in a production-ready client.
- Our API is still in-development and is subject to change. Work is required to get prepare the API for external use.
  - Embedded UIs are much safer and easier to get production-ready quickly.
  - At launch, we will likely only provide indirect access to a subset of APIs
  - More functionality and content will become available on the API over time.
  - Feel free to play with the entire API, including content that is not demoed. If there is something you want on the production-ready client, let us know.
- As the API is not yet hardened, it is possible to get models in a bad state of a malformed request is sent. **Please only use the provided SIT and UAT environments.**
- While all UIs will mostly work on mobile, there are currently a few rough edges. We expect this to improve rapidly.
- Only the following browsers are supported (see `babel.config.js` for the supported major versions):
  - Chrome
  - Firefox
  - Safari
  - Edge (Legacy + Chromium)

## Have questions?

Feel free to ask. We will be glad to answer any question.

## Documentation

Additional documentation should be provided by NextCapital with this project.

We've also added helpful in-code documentation throughout this codebase.

### API Client

The client exposes our API client library, allowing raw API access. See the appropriate pages in `js/pages` for examples on how to use it. This is the same API client that the embedded UIs use, so everything should always be in sync between all demos.

This client is a wrapper around a generated [Swagger](https://swagger.io/specification/v2/) client. We can provide this Swagger client in effectively any language. This Swagger client would provide raw integrations to each API route, but would miss out on all of the cool stuff the wrapper JavaScript client provides:

- model functions / model parsing
- diff checking
- caching
- authentication handling
- and more

Thus, we would recommend using our JavaScript API client on the client-side to interact with our API in a production-ready scenario (unlikely to be ready for launch).

To make exploring the API Client easier, we've exposed the API client as `NCApi` and [lodash](https://lodash.com/docs/4.17.15) as `_` on `window`. You can easily play with the API via the command line with developer tools.

See the "Important Notes" section above for some additional disclaimers. We do not expect to provide raw API access at launch (instead providing indirect access), but may provide raw access down the road.

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
