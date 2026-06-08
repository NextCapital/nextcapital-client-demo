# Getting Started

## Why This Repository Exists

This repository demonstrates how to integrate the `@nextcapital/client` SDK. It includes a runnable demo with multiple integration examples and a minimal starter template. The codebase is kept intentionally simple.

## Prerequisites

- Node.js and npm (see `package.json` `engines` field for version requirements)
- A valid NextCapital solution ID and authentication credentials (JWT bearer assertion or access token)
- Familiarity with JavaScript, React, and npm

## Quick Setup

```bash
# Clone the repository
git clone git@github.com:NextCapital/nextcapital-client-demo.git
cd nextcapital-client-demo

# Install dependencies
npm install

# Start the dev server (replace with your credentials)
npm run start -- --solution=<solution-id> --exchange-token=<jwt>
```

Open `http://localhost:8080` in a browser. Select demos from the header dropdown.

## Authentication Options

| Flag | Description |
|------|-------------|
| `--exchange-token=<jwt>` | JWT bearer assertion exchanged server-side for an access token (recommended) |
| `--access-token=<token>` | Pre-obtained access token used directly |

One of these is required. JWTs have a limited lifetime; restart the server with a new token when the old one expires.

## Additional Options

| Flag | Default | Description |
|------|---------|-------------|
| `--solution=<id>` | `nextcapital` | Partner solution identifier |
| `--env=<name>` | `sit` | Target environment |

For the full CLI reference including port, proxy endpoint, and live reload options, see [Dev Server Configuration](../components/dev-server.md#configuration).

## What to Explore First

| Goal | Where to Look |
|------|--------------|
| Understand the overall architecture | [Architecture overview](../README.md) |
| See how the SDK is configured | [js/index.jsx](../../../js/index.jsx) |
| See the simplest embed example | [js/pages/EmbeddedPlanningDemo.jsx](../../../js/pages/EmbeddedPlanningDemo.jsx) |
| Understand the dev server proxy | [Dev server component doc](../components/dev-server.md) |
| Start a new integration from scratch | [minimal-demo/](../../../minimal-demo/) and [Minimal Demo doc](../components/minimal-demo.md) |
| Add a new demo page | [Adding a new demo guide](../guides/adding-a-new-demo.md) |
| Look up SDK API details | [SDK API reference](../reference/nextcapital-client-api.md) |
| Understand domain terminology | [Glossary](../reference/glossary.md) |

## Key Concepts to Understand

Understand these foundational concepts before exploring the code:

1. **Local vs. Remote Client:** The npm package (`@nextcapital/client`) is a thin bootstrap layer. The actual business logic and UIs are served remotely at runtime. See the [glossary](../reference/glossary.md) for details.

2. **Proxy Mode:** This demo uses `PROXY` access type, meaning the server handles authentication and proxies all API requests. The browser never touches auth tokens.

3. **Configure-Once Lifecycle:** `configure()` must be called exactly once, before any rendering. It downloads remote assets and cannot be called again.

4. **Solution-Dependent Features:** Not all SDK modules are available for all solutions. The demo uses `SolutionSpecificDemo` to gracefully handle missing modules.

## Development Workflow

```bash
# Start dev server with auto-rebuild and LiveReload
npm run start -- --solution=<id> --exchange-token=<jwt>

# Run all linters
npm run lint

# Build without starting the server
npm run build

# Run the full CI check locally
npm run ci:local
```

## Available Demos

The demo application includes demos for every major SDK embed type and service. See the [demo page catalog](../components/client-application.md) for the complete list with routes and SDK modules.

If a demo is not supported for the current solution, a message displays: "Sorry, this demo is not available for the current solution." This is expected behavior.

## Next Steps

- Read the [project wiki](https://github.com/NextCapital/nextcapital-client-demo/wiki) for comprehensive SDK documentation
- Follow the [integration guide](../guides/integrating-nextcapital-client.md) to build your own integration
- Review the [startup and auth flow](../flows/startup-and-auth.md) to understand the initialization sequence

### Evidence

- `package.json` -- `scripts.start`, `engines` field
- `server/args.js` -- CLI argument definitions
- `README.md` -- Original getting started instructions
