# NextCapital Client Demo -- Architecture Documentation

This repository demonstrates how to integrate the `@nextcapital/client` SDK into a partner web application. It contains a runnable React demo application with an Express dev server that proxies authenticated API requests to NextCapital backends, plus a minimal starter template for partners beginning new integrations.

## System Architecture

The system has three layers: a **browser application** that embeds NextCapital UIs via the SDK, a **dev server** that proxies API requests with authentication, and the **NextCapital backend** that serves remote client assets and API responses.

```d2
direction: down

Browser: {
  app: Demo Application
  sdk: NC SDK {
    local: Local Client
    remote: Remote Client
  }
  app -> sdk.local: "configure() + getEmbed()"
  sdk.local -> sdk.remote: "Downloads at runtime"
}

Server: {
  express: Express Server
  proxy: API Proxy
  session: Session Store
  session -> proxy: "req.token"
}

NC: NextCapital Backend {shape: cloud}

Browser.app -> Server.express: "/api/* requests"
Server.express -> Server.session: "Middleware chain"
Server.proxy -> NC: "Proxied + authenticated"
Browser.sdk.remote -> NC: "Remote assets"
```

### Key Architectural Decisions

**Local + Remote client split:** The npm package is intentionally thin. Business logic and embedded UIs are served remotely, allowing NextCapital to ship updates without partner redeployment.

**Proxy mode:** The demo uses `ENVIRONMENT_ACCESS_TYPE.PROXY`, keeping auth tokens on the server. This is the recommended production pattern for security and operational simplicity.

**Build-time constants:** Solution ID and environment class are injected at compile time via webpack `DefinePlugin`, enabling one codebase to serve multiple solutions and environments.

## Documentation Map

### For AI Agents and Developers Working in This Repo

| You need to understand... | Read this |
|---------------------------|-----------|
| System architecture and component relationships | This file |
| Dev server internals (proxy, auth, config) | [components/dev-server.md](components/dev-server.md) |
| Client application structure and demo catalog | [components/client-application.md](components/client-application.md) |
| Minimal integration template | [components/minimal-demo.md](components/minimal-demo.md) |
| Startup and authentication flow | [flows/startup-and-auth.md](flows/startup-and-auth.md) |
| Widget embedding lifecycle | [flows/widget-embedding.md](flows/widget-embedding.md) |
| How to add a new demo page | [guides/adding-a-new-demo.md](guides/adding-a-new-demo.md) |
| How to integrate the SDK in a new project | [guides/integrating-nextcapital-client.md](guides/integrating-nextcapital-client.md) |
| Getting started and setup | [onboarding/getting-started.md](onboarding/getting-started.md) |
| Domain vocabulary | [reference/glossary.md](reference/glossary.md) |
| Repository file structure | [reference/repository-map.md](reference/repository-map.md) |
| SDK API reference | [reference/nextcapital-client-api.md](reference/nextcapital-client-api.md) |

### For Human Developers

Setup, contributing guidelines, and usage instructions are in the root [README.md](../../README.md). The [project wiki](https://github.com/NextCapital/nextcapital-client-demo/wiki) contains comprehensive SDK documentation maintained by the NextCapital team.

## Key Concepts

| Concept | Description | Canonical Reference |
|---------|-------------|-------------------|
| Local vs. Remote Client | Thin npm bootstrap vs. remotely-served business logic and UIs | [reference/glossary.md](reference/glossary.md) |
| Configure-Once Lifecycle | `configure()` is called exactly once at startup; subsequent calls throw | [reference/nextcapital-client-api.md](reference/nextcapital-client-api.md) |
| NextCapitalComponent | React component managing embed lifecycle (wait, create, mount) | [reference/nextcapital-client-api.md](reference/nextcapital-client-api.md) |
| Solution-Specific Modules | Not all SDK modules are available for all solutions; gated by `SolutionSpecificDemo` | [flows/widget-embedding.md](flows/widget-embedding.md) |
| Proxy Authentication | Server exchanges JWT for access token, attaches to proxied requests | [flows/startup-and-auth.md](flows/startup-and-auth.md) |

## Proprietary Patterns

### Widget Embedding via `NextCapitalComponent` + `getEmbed`

Every embedded NextCapital UI uses `NextCapitalComponent` with a `getEmbed` factory. See [Widget Embedding Flow](flows/widget-embedding.md) for the full lifecycle and [SDK API Reference](reference/nextcapital-client-api.md#react-integration) for the prop contract. To add a new embed, follow the [adding a new demo guide](guides/adding-a-new-demo.md).

### Solution-Specific Module Gating

Some SDK modules are only available for certain solutions. See [Widget Embedding — Solution-Specific Gating](flows/widget-embedding.md#solution-specific-gating) for how this is handled.

## Extension Points

| Extension Type | Directory | Convention | Canonical Example | Also Update |
|---------------|-----------|------------|-------------------|-------------|
| New demo page | `js/pages/` | `<ModuleName>Demo.jsx` | `js/pages/EmbeddedPlanningDemo.jsx` | `js/DemoApplication.jsx` (import + `demos` array) |
| New shared component | `js/components/` | `<ComponentName>.jsx` | `js/components/WidgetBox.jsx` | None |
| New environment | `server/environments.json` | JSON key with `authEndpoint` + `proxyEndpoint` | Existing entries | None |
| Custom styles | `styles/demo.scss` | `.demo-*` class prefix | Existing rules | None |

## Build and CI

The project builds with webpack (JS) and sass (CSS). CI runs on pull requests via GitHub Actions with four parallel jobs: dependency caching, lint, build, and license compliance. See [reference/repository-map.md](reference/repository-map.md) for the full npm script inventory.

## Related Documentation

- [Project Wiki](https://github.com/NextCapital/nextcapital-client-demo/wiki) -- Comprehensive SDK documentation (Quick Start, Auth, Embedded UIs, Services)
- [Root README](../../README.md) -- Setup instructions and usage
- [Changelog](https://github.com/NextCapital/nextcapital-client-demo/wiki/Changelog) -- SDK version history and migration notes

## Unknowns and Open Questions

| # | Severity | Claim | Context | Suggested Action |
|---|----------|-------|---------|------------------|
| 1 | LOW | `minimal-demo/` uses React 17 and older dependency versions | Minimal Demo component doc | Confirm if this is intentional compatibility floor or needs updating |
| 2 | LOW | LiveReload port 8081 is hardcoded with no CLI override | Dev server gotchas | Confirm if this is acceptable or should be configurable |

### Evidence

- `js/index.jsx` -- Application entry point and SDK configuration
- `js/DemoApplication.jsx` -- App shell, routing, and demo catalog
- `server/server.js` -- Express server and middleware chain
- `server/proxy.js` -- API proxy with auth header injection
- `webpack.config.js` -- DefinePlugin for build-time constants
- `package.json` -- Dependencies and npm scripts
