# Component: Dev Server

- **Type:** Express HTTP server
- **Location:** `server/`
- **Architecture role:** Development infrastructure; API proxy and auth gateway
- **Purpose:** Proxies API requests to NextCapital backends with authentication, serves static assets, and supports live reload.
- **Boundaries:** Owns auth token management and API proxying. Does not own business logic or UI rendering.

## Why It Exists

Partners must proxy API requests through their own server to avoid exposing authentication tokens in the browser. This dev server demonstrates the **recommended proxy pattern** as a minimal reference for partners building their production proxy. Complexity is intentionally low; production-hardening requirements are documented in code comments.

## Responsibilities

- Validates CLI authentication arguments at startup
- Serves built static assets (`dist/`) and the HTML shell
- Acquires and caches OAuth access tokens (via JWT exchange or direct token)
- Proxies `/api` requests to the appropriate NextCapital environment with auth headers
- Injects LiveReload script for development hot-refresh (when enabled)
- Maps environment names to auth and API endpoint URLs

## Non-Responsibilities

- Does **not** implement multi-user session management (single-user, single-token demo)
- Does **not** implement CSRF protection (commented guidance only)
- Does **not** implement auth retry on 401 responses (commented guidance only)
- Does **not** manage SSL/TLS termination

## Internal Structure

### Module Relationships

| Module | Role | Key Symbols |
|--------|------|-------------|
| `server/args.js` | CLI argument parsing via yargs | Exports parsed `argv` object |
| `server/environments.json` | Environment-to-endpoint mapping | JSON keyed by environment name |
| `server/session.js` | Token acquisition and caching | `Session` object with `middleware()`, `getToken()`, `jwtExchange()` |
| `server/proxy.js` | Reverse proxy middleware | `ApiProxy` middleware from `createProxyMiddleware` |
| `server/server.js` | Express app wiring and startup | Express `app` instance |

### Request Pipeline

For every `/api/*` request:

1. `Session.middleware` runs first, calling `getToken()` to retrieve or acquire an auth token
2. Token is set on `req.token`
3. `ApiProxy` reads `req.token` and sets the `Authorization: Bearer` header on the upstream request
4. The proxy forwards the request to the configured `proxyEndpoint`

## Interfaces

### Inbound

- **HTTP `GET /`** -- Serves `dist/index.html` with optional LiveReload script injection -- `server/server.js`
- **HTTP `GET /dist/*`** -- Static file serving -- `server/server.js` via `express.static`
- **HTTP `* /api/*`** -- Proxied to NextCapital API -- `server/server.js` middleware chain

### Outbound

- **HTTP POST** to auth endpoint -- Token exchange -- `server/session.js` (`_makeURLEncodedAuthRequest`)
- **HTTP proxy** to `proxyEndpoint` -- All API traffic -- `server/proxy.js` (`ApiProxy`)

## Configuration

### CLI Arguments

All runtime configuration is provided via CLI flags parsed by `server/args.js`:

| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| `--exchange-token` | string | -- | JWT bearer assertion for token exchange |
| `--access-token` | string | -- | Direct access token (skip exchange) |
| `--env` | string | `sit` | Environment name for endpoint lookup |
| `--port` | integer | `8080` | Express server listen port |
| `--proxy-endpoint` | string | -- | Override proxy target URL |
| `--live-reload` / `--no-live-reload` | boolean | `true` | Enable/disable LiveReload server |

Either `--exchange-token` or `--access-token` is required. The server exits with an error if neither is provided.

### Environment Endpoints

`server/environments.json` maps environment names to `authEndpoint` and `proxyEndpoint` URLs. Available environments: `local`, `development`, `sit`, `uat`, `stg`, `production`. The `--proxy-endpoint` CLI flag overrides the JSON-configured proxy target.

## Security Considerations

This server is a **demo-only** implementation. Production implementations must address:

- **Multi-user sessions:** Replace the in-memory single-token cache with a proper session store
- **CSRF protection:** Add CSRF tokens to proxied requests (the SDK provides `Authentication.setHeader` for this)
- **Auth retry:** Re-acquire tokens and retry on 401 responses from the upstream API
- **Token validation:** Validate JWT structure before attempting exchange
- **HTTPS:** Terminate TLS in front of the proxy

These requirements are documented in code comments within `server/proxy.js` and `server/session.js`.

## Gotchas and Edge Cases

- **Token caching is process-scoped:** The `Session` object stores one token in memory. Restarting the server clears the token.
- **Sync file read on root route:** `server/server.js` uses `fs.readFileSync` to serve the HTML shell. Acceptable for a local dev server but would block under load in production.
- **LiveReload port is hardcoded:** The LiveReload server always runs on port 8081 when enabled. There is no CLI flag to change it.
- **Yargs kebab-to-camelCase mapping:** `build-run.js` passes kebab-case flags (`--exchange-token`) while `server/args.js` defines camelCase keys (`exchangeToken`). This works due to yargs default parser behavior but could break if parser options change.
- **5-minute proxy timeout:** Both `timeout` and `proxyTimeout` are set to 5 minutes in `server/proxy.js`. This is intentionally generous because the NextCapital server applies its own timeout first.

### Evidence

- `server/server.js` -- Express app setup, middleware ordering, LiveReload injection
- `server/proxy.js` -- `createProxyMiddleware` configuration and `proxyReq` hook
- `server/session.js` -- `Session` object with `middleware`, `getToken`, `jwtExchange`
- `server/args.js` -- Yargs option definitions
- `server/environments.json` -- Endpoint mapping structure
- `build-run.js` -- Dev orchestration launching both webpack and server
