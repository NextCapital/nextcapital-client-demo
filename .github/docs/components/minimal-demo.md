# Component: Minimal Demo

- **Type:** Standalone integration template
- **Location:** `minimal-demo/`
- **Architecture role:** Partner onboarding starter template
- **Purpose:** Provides the minimum code required to configure `@nextcapital/client` and render an embedded NextCapital experience. Partners copy and adapt this as their integration starting point.
- **Boundaries:** Self-contained with its own `package.json`, webpack config, and babel config. Does not depend on any code in the main demo application.

## Why It Exists

The main demo application includes routing, multiple pages, a dev server, SCSS styling, and LiveReload infrastructure. Partners starting a new integration need to see the **smallest possible working example** without that complexity. The minimal demo strips the integration to a single JSX file, a single HTML file, and minimal build tooling.

## Responsibilities

- Demonstrates the configure-then-render pattern in a single file
- Provides explicit TODO markers for every value a partner must customize
- Builds to a single production-ready JS bundle

## Non-Responsibilities

- Does **not** include a dev server or API proxy (partners must build their own)
- Does **not** include routing, navigation, or multiple demos
- Does **not** include styling beyond the minimum CSS for full-height embed rendering

## How It Differs From the Main Demo

| Aspect | Main Demo | Minimal Demo |
|--------|-----------|-------------|
| Configuration | Build-time injection via DefinePlugin | Hardcoded placeholders with TODOs |
| Routing | `HashRouter` with multiple routes | None; single embed |
| Server | Express with proxy and auth | None included |
| Styling | External SCSS compiled to CSS | Inline CSS in HTML |
| Build mode | Development with source maps | Production without source maps |
| React version | React 18 | React 17 (lower floor for compatibility) |
| Embed demonstrated | All widget types | `EmbeddedPlanning` only |

## Key Files

| File | Role |
|------|------|
| `minimal-demo/index.jsx` | Single-file SDK configuration and `EmbeddedPlanning` embed |
| `minimal-demo/index.html` | Host HTML with inline CSS and `demo.js` script |
| `minimal-demo/package.json` | Minimal dependency set for build tooling |
| `minimal-demo/webpack.config.js` | Single-entry production webpack build |
| `minimal-demo/babel.config.js` | Browser targets and JSX preset |

## TODO Items Partners Must Address

`minimal-demo/index.jsx` contains five explicit TODO markers that partners must resolve before the integration works:

| TODO | What To Change |
|------|---------------|
| `TODO: Set the environment correctly` | Replace `ENVIRONMENT_CLASS.SIT` with the target environment |
| `TODO: Set the proxy endpoint correctly` | Replace `'/your-api-proxy-here'` with the actual backend proxy route |
| `TODO: set the solutionId properly` | Replace `'your-solution-here'` with the partner solution identifier |
| `TODO: Define actual callbacks and loading content` | Replace `console.log` callbacks with real application behavior |
| `TODO: target correct element` | Ensure `.render-target` matches the mount element in the host page |

## Build and Usage

Build the minimal demo from the repository root:

```bash
npm run build:minimal
```

This produces `minimal-demo/dist/demo.js`. Include this script in the host HTML page. The minimal demo **cannot run standalone** -- it requires a working API proxy on the partner server to handle authentication and forward requests to NextCapital.

## Gotchas and Edge Cases

- **No server included:** Unlike the main demo, there is no Express server. Partners must implement their own proxy server following the patterns in `server/proxy.js` and `server/session.js`.
- **Older dependency versions:** The minimal demo `package.json` pins older versions of React, Babel, and webpack to maintain a lower compatibility floor. Partners should use versions appropriate for their stack.
- **LiveReload script in HTML:** `minimal-demo/index.html` includes a hardcoded LiveReload script reference pointing to `localhost:8081`. This is for local development convenience and should be removed in production.

### Evidence

- `minimal-demo/index.jsx` -- `configure()` with TODO placeholders, `DemoApplication` component
- `minimal-demo/index.html` -- Inline CSS, viewport meta, `demo.js` script
- `minimal-demo/package.json` -- Dependency subset and build script
- `minimal-demo/webpack.config.js` -- Production mode, single entry/output
- `package.json` -- `build:minimal` script
