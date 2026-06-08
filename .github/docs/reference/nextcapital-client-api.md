# NextCapital Client SDK API Reference

The `@nextcapital/client` package provides a local npm client that bootstraps a remotely-served client containing business logic and embedded UIs. This reference covers the SDK API surface used by this demo. For the complete API, see the [project wiki](https://github.com/NextCapital/nextcapital-client-demo/wiki).

## Why This Architecture Exists

The SDK splits into a **local client** (npm package) and a **remote client** (served from NextCapital CDN at runtime). This minimizes partner bundle size, avoids dependency conflicts, and lets NextCapital ship UI updates without partner redeployment.

## Configuration

### `configure(options)` returns `Promise<NextCapitalClient>`

One-time initialization that downloads remote client assets and establishes environment context.

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `solutionId` | `string` | Yes | Partner tenant identifier (dash-separated) |
| `environment.environmentClass` | `ENVIRONMENT_CLASS` | Yes | Target environment: `SIT`, `UAT`, or `PRODUCTION` |
| `environment.accessType` | `ENVIRONMENT_ACCESS_TYPE` | Yes | Transport strategy: `PROXY` (recommended), `DIRECT`, or `DIRECT_CORS_PROXY` |
| `environment.trackingEnabled` | `boolean` | Yes | Enable Segment analytics tracking |
| `environment.endpoint` | `string` | Conditional | API proxy path (required for `PROXY` and `DIRECT_CORS_PROXY`) |
| `environment.authEndpoint` | `string` | Conditional | Auth endpoint (required for `DIRECT_CORS_PROXY`) |
| `environment.bootstrapCallback` | `function` | No | Optional async callback receiving the client after bootstrap |

**Behavior:**

- Can only be called **once**. Subsequent calls throw.
- Attaches CSS and scripts to the document, initializes the remote client.
- In `PROXY` mode, handles recordkeeper sync automatically (may be slow on first call).
- Returns the configured `NextCapitalClient` instance.

### Lifecycle Helpers

| Function | Returns | Description |
|----------|---------|-------------|
| `hasConfigured()` | `boolean` | `true` once `configure()` has been called (even if still in progress) |
| `hasClient()` | `boolean` | `true` after configure completes; does not guarantee active auth session |
| `getClient()` | `NextCapitalClient` | Returns the configured client; **throws** if not yet loaded |
| `waitForConfiguredClient()` | `Promise<NextCapitalClient>` | Resolves once configuration completes |
| `waitForAuthentication()` | `Promise<NextCapitalClient>` | Resolves when authenticated; in `PROXY` mode, resolves after configure |
| `isClientReady()` | `boolean` | `true` when both configured and authenticated |

## Authentication

Authentication behavior depends on the configured access type.

**PROXY mode (recommended):** The partner server handles token exchange and attaches the `Authorization` header to proxied requests. `configure()` completion is sufficient; calling `Authentication.authenticate()` in PROXY mode **throws an error**.

**DIRECT / DIRECT_CORS_PROXY modes:** The host application must call `Authentication.authenticate()` after configuration.

| Method | Description |
|--------|-------------|
| `authenticate({ onNeedsAuthentication, token? })` | Establishes session. `onNeedsAuthentication` is called when auth is needed. Single-call only. |
| `jwtLogin({ jwt })` | Exchanges JWT for session. Must be called inside `onNeedsAuthentication`. |
| `setHeader(header, value)` | Adds a custom header (e.g., CSRF token) to all API requests |
| `clearHeader(header)` | Removes a previously set custom header |
| `hasAuthenticated()` | `true` once authenticate has been called |
| `hasSession()` | `true` when an active session exists |
| `hasLostAuth()` | `true` when session was established but is now missing |
| `getLocalToken()` | Returns the current token (only in non-PROXY modes) |

## React Integration

### `NextCapitalComponent`

A React component that manages the full embed lifecycle.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `getEmbed` | `(client) => Embed` | Yes | Factory function that receives the client and returns an embed instance |
| `loadingContent` | `ReactNode` | Yes | Content displayed while the client initializes |
| `renderOptions` | `object` | No | Options passed to each render cycle |

**Why use NextCapitalComponent:** It handles waiting for configuration and authentication, prevents premature remote access, and manages embed mount/unmount lifecycle automatically.

## Embedded UIs

All embeds are created through client module constructors and rendered via `NextCapitalComponent`.

| Embed | Scale | Singular | Key Options |
|-------|-------|----------|-------------|
| `EmbeddedPlanning` | Full-screen | Yes | `onExit`, `onEnrolled`, `onEnrollmentStart`, `onUnenrolled`, `onUnenrollmentStart`, `onError` |
| `ExpressWorkplaceEnrollment` | Large widget | Yes | `clientIdentifier`, `onEnrolled`, `onEnrollmentStart`, `onNavigateToFullExperience`, `onError` |
| `CustomWorkplaceEnrollment` | Large widget | Yes | `clientIdentifier`, `planIdentifier`, `productKind`, `stagedContributions`, `onComplete`, `onExternalBack`, `onExternalCancel`, `onError`; method: `enroll(businessProcessId, referenceId)` |
| `CurrentReadiness` | Widget | Yes | `onNavigateToFullExperience`, `onNavigateToInteractive`, `onNavigateToSaveMoreNow`, `onError`; render: `useCompactStyle` |
| `CurrentReadinessInteractive` | Widget | Yes | `clientIdentifier`, `planIdentifier`, `onNavigateToFullExperience`, `onNavigateToContributions`, `onNavigateToSaveMoreNow`, `onError` |
| `RetirementReportCard` | Widget | No | `context` (`funding`, `savings`, `assetAllocation`), `onButtonClick`, `onError` |

**Singular** means only one instance shares state across the application. `RetirementReportCard` is the exception and supports multiple simultaneous instances.

## Services

| Service | Purpose | Key Methods |
|---------|---------|-------------|
| `ColorService` | Runtime theming via CSS custom properties | `COLORS`, `getColor(name)`, `setColor(name, color, overrides?)`, `setColors(mapping)` |
| `CopyHelper` | Copy text debugging and prototyping | `enableCopyDebugMode()`, `disableCopyDebugMode()`, `getRegisteredCopy()`, `registerCopyForKey(key, copy)` |

## Environment Constants

| Constant | Values |
|----------|--------|
| `ENVIRONMENT_CLASS` | `SIT`, `UAT`, `PRODUCTION` |
| `ENVIRONMENT_ACCESS_TYPE` | `PROXY`, `DIRECT`, `DIRECT_CORS_PROXY` |

### Evidence

- `js/index.jsx` -- `configure()` call with all environment options
- `js/DemoApplication.jsx` -- `waitForConfiguredClient()` usage
- `js/pages/EmbeddedPlanningDemo.jsx` -- `NextCapitalComponent` with `getEmbed` pattern
- `js/pages/CustomWorkplaceEnrollmentDemo.jsx` -- `enroll()` method and `stagedContributions`
- `js/pages/ColorService.jsx` -- `ColorService` API usage
- `js/pages/CopyHelperDemo.jsx` -- `CopyHelper` API usage
- Wiki: Local Client, Remote: Authentication, Remote: Embedded UIs, Remote: ColorService, Remote: Copy Helper
