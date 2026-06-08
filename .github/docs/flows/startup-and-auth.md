# Runtime Flow: Startup and Authentication

## Trigger

- **Type:** Application startup (page load)
- **Location:** `js/index.jsx` (module load) and `server/server.js` (server startup)

## Why This Flow Matters

The NextCapital client requires a strict initialization sequence: configure before render, authenticate before embed. Getting this sequence wrong causes silent failures or runtime errors. This flow traces the startup path from server launch to the first embed render.

## Sequence Diagram

```d2
direction: right

server: Dev Server
browser: Browser
sdk: NC SDK {
  local: Local Client
  remote: Remote Client
}
nc_api: NextCapital API {shape: cloud}

server -> browser: "Serves index.html + demo.js"
browser -> sdk.local: "configure()"
sdk.local -> sdk.remote: "Downloads JS/CSS"
sdk.remote -> nc_api: "RK sync (PROXY mode)"
sdk.remote -> browser: "Client ready"
browser -> browser: "waitForConfiguredClient()"
browser -> browser: "Render DemoApplication"
```

## Narrative

### Server Startup

1. Developer runs `npm run start -- --solution=<id> --exchange-token=<jwt>` which executes `build-run.js`
2. `build-run.js` spawns two child processes:
   - Webpack in watch mode (rebuilds `dist/demo.js` on file changes)
   - Express server (`server/server.js`)
3. `server/server.js` validates that `--exchange-token` or `--access-token` was provided -- `server/server.js` (startup guard)
4. Express registers middleware: favicon, cookie parser, root route handler, static file serving, and the `/api` proxy chain
5. Server starts listening on the configured port

### Client Bootstrap

6. Browser requests `/` and receives `dist/index.html` with LiveReload script injected (if enabled) -- `server/server.js` (root route handler)
7. Browser loads `dist/demo.js` (the webpack bundle)
8. `js/index.jsx` executes immediately at module load time:
   - Assigns `lodash` to `window._` for console debugging
   - Calls `configure()` with environment class from `ENVIRONMENT_CLASS[NC_ENV]`, access type `PROXY`, endpoint `/api`, and solution ID from `SOLUTION_ID`
9. `configure()` (SDK internal) attaches remote client CSS and JavaScript to the document, then initializes the remote client. In PROXY mode, this includes a recordkeeper sync operation that may be slow on first call.

### React Mounting

10. On `DOMContentLoaded`, `js/index.jsx` creates a React root on `.render-target` and renders `DemoApplication` -- `js/index.jsx`
11. `DemoApplication.componentDidMount()` calls `waitForConfiguredClient()` -- `js/DemoApplication.jsx`
12. While waiting, `DemoApplication` renders a "loading" message based on `state.isInitializing`
13. When the promise resolves, `isInitializing` is set to `false` and the demo route tree renders
14. If configuration fails, `failedToConfigure` is set to `true` and an error message displays

### First API Request (Auth Token Acquisition)

15. When a demo page creates an embed via `NextCapitalComponent`, the embed makes API calls through `/api`
16. `Session.middleware` intercepts the first `/api` request and calls `getToken()` -- `server/session.js`
17. `getToken()` checks for a cached token. On the first request, none exists:
    - If `--exchange-token` was provided: calls `jwtExchange()` to POST to the auth endpoint and exchange the JWT for an access token
    - If `--access-token` was provided: uses the token directly
18. The token is cached in `Session.token` and set on `req.token`
19. `ApiProxy` reads `req.token` and sets `Authorization: Bearer <token>` on the upstream request -- `server/proxy.js`
20. Subsequent requests reuse the cached token without re-authentication

## Data Lineage

- **Build-time constants:** `NC_ENV` and `SOLUTION_ID` flow from CLI args through `webpack.config.js` DefinePlugin into the browser bundle
- **Auth token:** Flows from CLI args through `server/args.js` to `server/session.js` to `server/proxy.js` as an `Authorization` header
- **Environment endpoints:** Flow from `server/environments.json` through `server/args.js` to both `server/session.js` (auth endpoint) and `server/proxy.js` (proxy endpoint)

## Reliability and Failure Behavior

- **Missing auth args:** Server exits with non-zero code at startup -- `server/server.js`
- **Token exchange failure:** `Session.middleware` catches the error, logs it, and returns HTTP 401 -- `server/session.js`
- **SDK configuration failure:** `DemoApplication` catches the rejection and sets `failedToConfigure` state, displaying an error message -- `js/DemoApplication.jsx`
- **No retry logic:** Token acquisition does not retry on failure. If the token expires, the server must be restarted with a new token.

### Evidence

- `build-run.js` -- Spawns webpack watch and Express server
- `js/index.jsx` -- `configure()` call and React root creation
- `js/DemoApplication.jsx` -- `waitForConfiguredClient()` and readiness state
- `server/server.js` -- Middleware chain and startup validation
- `server/session.js` -- `middleware()`, `getToken()`, `jwtExchange()`
- `server/proxy.js` -- `proxyReq` handler setting auth header
- `webpack.config.js` -- `DefinePlugin` for `NC_ENV` and `SOLUTION_ID`
