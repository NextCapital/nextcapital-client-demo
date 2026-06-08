# Guide: Integrating @nextcapital/client

## Why This Guide Exists

Partners need a clear, sequential path to embed NextCapital experiences. This guide distills the steps from the [project wiki](https://github.com/NextCapital/nextcapital-client-demo/wiki) with references to this demo codebase at each step.

## Integration Overview

Integration requires three things:

1. A **server-side proxy** that handles authentication and forwards API requests to NextCapital
2. A **client-side bootstrap** that configures the SDK and renders embedded UIs
3. **Callback implementations** that handle embed lifecycle events in your application

## Step-by-Step

### Install the SDK

```bash
npm install --save @nextcapital/client
```

The SDK has peer dependencies on React, ReactDOM, PropTypes, Lodash, and Moment. If your application already includes these, ensure compatible versions and use webpack aliases to prevent duplicate instances. See the [Dependencies and Runtime](https://github.com/NextCapital/nextcapital-client-demo/wiki/Dependencies-and-Runtime) wiki page for details.

### Build a Server-Side Proxy

**Why proxy:** The recommended access type (`PROXY`) keeps authentication tokens on the server and avoids CORS complexity. The browser never handles auth tokens directly.

Your proxy must:

1. **Exchange a bearer assertion for an access token** -- Create a signed JWT with required claims (`iss`, `aud`, `sub`, `exp`) and POST it to the NextCapital auth endpoint. See `server/session.js` -- `jwtExchange()` for the exchange flow.
2. **Cache the token** -- Reuse the access token for the duration of the user session. See [Access Token](../reference/glossary.md) in the glossary for TTL details.
3. **Attach the token to proxied requests** -- Set `Authorization: Bearer <token>` on every request forwarded to the NextCapital API. See `server/proxy.js` -- `proxyReq` handler.
4. **Implement production hardening** -- Multi-user sessions, CSRF protection, 401 retry, and HTTPS. See [Dev Server -- Security Considerations](../components/dev-server.md#security-considerations) for the full checklist.

The demo server in `server/` demonstrates items 1-3. Item 4 requirements are documented in code comments but not implemented.

### Configure the SDK

Call `configure()` once, as early as possible in your application startup:

```javascript
import { configure, ENVIRONMENT_CLASS, ENVIRONMENT_ACCESS_TYPE } from '@nextcapital/client';

configure({
  solutionId: 'your-solution-id',
  environment: {
    environmentClass: ENVIRONMENT_CLASS.UAT,
    accessType: ENVIRONMENT_ACCESS_TYPE.PROXY,
    trackingEnabled: true,
    endpoint: '/your-api-proxy-path'
  }
});
```

**Key rules:**

- `configure()` can only be called **once**. Subsequent calls throw.
- Call it before any React rendering for best performance.
- In `PROXY` mode, do **not** call `Authentication.authenticate()` -- it will throw.
- The `endpoint` must match your proxy server route.

Full `configure()` API details: [SDK API Reference](../reference/nextcapital-client-api.md#configuration).

See `js/index.jsx` for the demo implementation.

### Wait for Readiness

The SDK loads remote assets asynchronously. Gate your UI on readiness before rendering embeds:

```javascript
import { waitForConfiguredClient } from '@nextcapital/client';

// In your app component
async componentDidMount() {
  try {
    await waitForConfiguredClient();
    // SDK is ready, render embeds
  } catch (error) {
    // Configuration failed
  }
}
```

See `js/DemoApplication.jsx` -- `componentDidMount()` for the demo implementation.

### Render an Embedded UI

Use `NextCapitalComponent` to render any embed:

```jsx
import { NextCapitalComponent } from '@nextcapital/client';

<NextCapitalComponent
  getEmbed={(client) => new client.EmbeddedPlanning({
    onExit: () => { /* navigate away */ },
    onEnrolled: () => { /* handle enrollment */ },
    onError: (error) => { /* handle error */ }
  })}
  loadingContent="Loading..."
/>
```

See `js/pages/EmbeddedPlanningDemo.jsx` for the simplest example. See the [widget embedding flow](../flows/widget-embedding.md) for the complete lifecycle.

### Implement Callbacks

Every embed requires callback functions. In this demo, callbacks use `alert()` and `console.log()`. In production, implement real application logic:

- **Navigation callbacks** (`onExit`, `onNavigateToFullExperience`): Route the user to the appropriate page
- **Lifecycle callbacks** (`onEnrolled`, `onUnenrolled`): Update application state, trigger analytics
- **Error callbacks** (`onError`): Log errors, show user-facing error messages

See the [SDK API reference](../reference/nextcapital-client-api.md) for the complete callback list per embed type.

### Set Up the HTML Host Page

Your HTML page needs:

- A viewport meta tag for mobile support
- Full-height CSS on the `html` and `body` elements
- A mount target element for React

See `static/index.html` for the main demo and `minimal-demo/index.html` for the minimal version.

## Environment Progression

| Environment | Purpose | Update Cadence |
|-------------|---------|---------------|
| SIT | Bleeding-edge development | Near-daily |
| UAT | Pre-production release candidates | Biweekly + patches |
| Production | User-facing | Biweekly |

Start development against SIT, validate in UAT before production release. A local npm version may be published before the corresponding remote version reaches higher environments.

## Dependency Management

- Use caret ranges (`^x.y.z`) for shared dependencies (React, Lodash, etc.)
- Use webpack aliases to prevent duplicate React instances (see `webpack.config.js` -- `resolve.alias`)
- Run `npm up` when bumping `@nextcapital/client`
- Track the [Changelog](https://github.com/NextCapital/nextcapital-client-demo/wiki/Changelog) for breaking changes

## Runtime Constraints

- **Do not use React 18 Concurrent Mode** with NextCapital embeds (tearing risk)
- **Do not modify embed DOM or CSS** -- embedded UI internals are not a public API
- **Do not use private exports** (underscore-prefixed methods or properties)
- **Do not use `NextCapitalClient` global directly** -- use `getClient()` or `waitForConfiguredClient()`

## Starting Point

For the fastest path to a working integration, copy the `minimal-demo/` directory and resolve all TODO markers. See the [Minimal Demo component doc](../components/minimal-demo.md) for details.

### Evidence

- `js/index.jsx` -- `configure()` call
- `js/DemoApplication.jsx` -- `waitForConfiguredClient()` readiness gate
- `js/pages/EmbeddedPlanningDemo.jsx` -- `NextCapitalComponent` usage
- `server/session.js` -- Token exchange implementation
- `server/proxy.js` -- Auth header injection
- `minimal-demo/index.jsx` -- Minimal integration with TODO placeholders
- `webpack.config.js` -- `resolve.alias` for dependency deduplication
- Wiki: Quick Start Guide, Authentication Proxies and Environments, Dependencies and Runtime
