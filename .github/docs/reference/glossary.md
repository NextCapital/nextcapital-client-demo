# Glossary

Domain-specific terms used throughout this codebase and the `@nextcapital/client` SDK documentation.

## Terms

| Term | Definition |
|------|-----------|
| **Access Token** | An OAuth token obtained by exchanging a bearer assertion. Used to authenticate API requests to NextCapital services. Has a maximum TTL of 12 hours and an idle timeout of 1 hour. |
| **Access Type** | The transport strategy for API communication. One of `PROXY`, `DIRECT`, or `DIRECT_CORS_PROXY`. Controls how the client routes requests and whether authentication is managed server-side or client-side. |
| **Bearer Assertion** | A signed JWT created by the partner and exchanged server-side for an access token. Uses RS256 signing with claims including `iss`, `aud`, `sub`, and `exp`. |
| **Client Identifier** | An optional scoping parameter passed to widget embeds to narrow the data scope to a specific client account. When `null`, scopes to all accounts. |
| **Configure** | The one-time initialization call (`configure()`) that sets up the local client, downloads remote client assets, and establishes environment context. Cannot be called more than once. |
| **Copy Helper** | A debugging and prototyping service that lets developers view and temporarily override UI text strings (copy) by key path. Not intended for permanent production customization. |
| **Color Service** | A runtime theming service that adjusts `--vds-*` CSS custom properties on `:root` to change embedded UI colors. Changes apply immediately. |
| **Embedded Planning** | A full-scale, full-screen embedded UI that provides the complete NextCapital planning experience including enrollment, contributions, asset allocation, and document vault. |
| **Embed** | An instance of a NextCapital UI widget or full-scale experience created through a client module constructor (e.g., `new client.EmbeddedPlanning({...})`). Managed by `NextCapitalComponent`. |
| **Environment Class** | The deployment environment tier: `SIT` (bleeding edge, near-daily updates), `UAT` (pre-production release candidates), or `PRODUCTION` (user-facing). |
| **Express Workplace Enrollment** | A simplified, full-width enrollment widget for streamlined workplace enrollment flows. |
| **Custom Workplace Enrollment** | An enrollment widget supporting product-specific variants (`managed_accounts`, `point_in_time_advice`) with staged contribution support and an imperative `enroll()` method. |
| **Local Client** | The npm-installed `@nextcapital/client` package. Contains configuration, lifecycle helpers, and `NextCapitalComponent`. Intentionally small to minimize partner bundle impact. |
| **NextCapitalComponent** | A React component that manages the embed lifecycle: waits for configuration and authentication, creates the embed via `getEmbed`, and handles mounting/unmounting. |
| **Plan Identifier** | An optional scoping parameter for widget embeds to target a specific plan. When `null`, the system scopes to the first eligible recordkeeper account. |
| **Product Kind** | A classification for Custom Workplace Enrollment specifying the enrollment product type. Values include `managed_accounts` and `point_in_time_advice`. |
| **Proxy Mode** | The recommended access type (`ENVIRONMENT_ACCESS_TYPE.PROXY`) where the partner server handles authentication and proxies all API requests. The browser never sees auth tokens directly. |
| **Remote Client** | The JavaScript and CSS assets served by NextCapital servers at runtime. Contains business logic, API client, authentication logic, and embedded UIs. Updated independently of the local client. |
| **Retirement Report Card** | A small widget displaying retirement readiness with optional context filtering (`funding`, `savings`, `assetAllocation`). Supports multiple simultaneous instances. |
| **Solution** | A partner tenant configuration identified by `solutionId`. Determines which modules, features, and behaviors are available on the client. Different solutions expose different client modules. |
| **Solution ID** | A dash-separated identifier (e.g., `example-partner`) passed to `configure()` that selects the partner tenant. Injected at build time via webpack `DefinePlugin` in this demo. |
| **Staged Contributions** | A pre-populated contribution configuration passed to Custom Workplace Enrollment, organized by tax treatment (`taxDeferred`, `taxFree`, `afterTaxDeferred`, etc.) with optional escalation rates. |

### Evidence

- `js/index.jsx` -- `configure()` call establishes environment and solution context
- `js/components/SolutionSpecificDemo.jsx` -- `getClient()` module-existence check demonstrates solution-dependent behavior
- `js/pages/CustomWorkplaceEnrollmentDemo.jsx` -- `stagedContributions` and `productKind` usage
- Wiki pages: Local Client, Remote: Authentication, Remote: Embedded UIs
