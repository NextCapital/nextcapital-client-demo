# External API Demo

A demo application that shows the potential of a NextCapital client within partner applications.

## Getting Started

This demo assumes familiarity with:

- `npm` and `node`
- Javascript (ES6)
- React / JSX
- `react-router`
- `webpack` and `babel`
- Promises and `async/await` syntax

To get started, simply run `npm install`. Once everything is installed, you can run:

- `npm run start:sit` to start the local dev server against NextCapital SIT
- `npm run start:uat` to start the local dev server against NextCapital UAT

Once the server is running, open `http://localhost:8080` in a browser to view the application.

### Codebase Overview

- The main entry point is `js/index.jsx`. This is where the application is configured and first rendered.
- The main React component for the application is `js/DemoApplication.jsx`. This is also
where all of the routes for the application are defined.
- Each demo lives within the `js/pages` folder. These demos use shared React components from the `js/components` folder.
- The main HTML page the application uses can be found in `static/index.html`.
- The embedded UIs require CSS. This can be found in the `static/nextcapital-styles` folder. This content should not be modified.
- The main nextcapital client javascript lives in the `nextcapital-client` folder. Eventually, this (and the CSS) would be delivered via an alternate means. This is the easiest way for now. It should not be modified.

## NextCapital Client

### Configuration

The NextCapital client needs to be configured before it can be used. See `js/index.js` for an example.

### Authentication/Session

The client needs to be authenticated before it can do anything. See how the session is handled in `js/DemoApplication.jsx` and `js/pages/LoginPage.jsx`.

### Embedded UIs

The client currently has several embedded UIs available. See appropriate pages in `js/pages` for examples on how to use them. These demos range from full-fledged applications to something as simple as a chart.

Notably, these UIs are all built in NextCapital's in-house application framework. This framework is 'routerless', meaning it can navigate pages without needing a URL defined. As such, while the overall application demo needs routes defined, the embedded UIs do not. This makes it much easier to embed our UI within another application, is it does not need to worry about defining routes.

### Api Client

The client exposes our API client library, allowing raw API access. See the appropriate pages in `js/pages` for examples on how to use it. This is the same client that the embedded UIs use, so everything should always be in sync between all demos.

This client is a wrapper around a generated swagger client. We can provide this swagger client in effectively any language. This swagger client would provide raw integrations to each API route, but would miss out on all of the cool stuff the wrapper javascript client provides:

- model functions / model parsing
- diff checking
- caching
- authentication handling
- etc...

Thus, we would recommend using our JavaScript API client client-side to interact with our API in a production-ready scenario.

To make exploring the API Client easier, we've exposed the client as `NCApi` and lodash as `_` on `window`. So, you can easily play with the API via the command line with developer tools.

See 'Important Notes` below for some additional disclaimers.

## Important Notes

- Both this demo application and the client it consumes were built by a single developer in three days. Nothing should be considered finalized or production-ready.
- This demo seeks only to show the possibilities of what NextCapital can do with a client *today*. The client was created specifically for this demo. Additional demos and changes are possible upon request.
- Authentication currently uses username/password login. This would NOT be the case for a production-ready client. Overall, expect the authentication lifecycle to be significantly refactored in a production-ready client.
- Our v2 API is still in-development and is both subject to change and not ready for production use externally. Significant work is required to get this API ready for external use. However, embedded UIs are much safer and easier to get production-ready quickly.
- As the v2 API is not yet hardened, it is possible to get models in a bad state of a malformed request is sent. Hence, please only use the provided SIT and UAT environments.
- While soon all UIs will work on mobile, currently we are probably only 80% there. We expect this to change rapidly.
- Feel free to play with the entire v2 API, even stuff that is not demoed.
- Only browsers more recent than IE11 are supported.

## Have questions?

Feel free to ask. We will be glad to answer any question.

## Documentation

Additional documentation should be provided by NextCapital with this project.

We've also added helpful in-code documentation throughout this codebase.
