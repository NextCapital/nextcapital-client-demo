# Component: Client Application

- **Type:** Single-page React application
- **Location:** `js/`
- **Architecture role:** Demo shell and SDK integration showcase
- **Purpose:** Demonstrates how to configure, initialize, and embed `@nextcapital/client` widgets in a React application. Serves as both a runnable feature catalog and a reference implementation for partners.
- **Boundaries:** Owns UI rendering, routing, and demo page management. Does not own API communication (delegated to the dev server proxy) or business logic (delegated to the SDK).

## Why It Exists

Partners need working examples of every embed type, service, and lifecycle pattern. This application provides a navigable catalog of demos that exercise the full SDK surface. Each demo page is a self-contained reference for partners implementing their own integration.

## Responsibilities

- Configures `@nextcapital/client` at application startup with environment and solution context
- Gates all UI rendering on client configuration readiness
- Provides hash-based routing to individual demo pages
- Renders a header with demo selection dropdown and documentation link
- Wraps demo content in consistent layout components

## Non-Responsibilities

- Does **not** implement authentication (handled by the [dev server](dev-server.md) proxy)
- Does **not** implement production navigation or application chrome
- Does **not** manage persistent state beyond the current session

## Internal Structure

### Bootstrap Sequence

`js/index.jsx` runs two operations in sequence:

1. **Configure the SDK** -- Calls `configure()` synchronously at module load time, before any React rendering. This establishes environment class, access type, proxy endpoint, and solution ID using build-time constants (`NC_ENV`, `SOLUTION_ID`) injected by webpack `DefinePlugin`.

2. **Mount React** -- On `DOMContentLoaded`, creates a React root on `.render-target` and renders `DemoApplication`.

### App Shell

`js/DemoApplication.jsx` is a class component that:

1. Calls `waitForConfiguredClient()` in `componentDidMount` to gate rendering until the SDK is ready
2. Tracks `isInitializing` and `failedToConfigure` state to show appropriate loading/error messages
3. Uses `HashRouter` with `Switch`/`Route` to map URL paths to demo page components
4. Renders a header bar with `HeaderLeft` (dropdown selector), `HeaderTitle` (current demo name), and a documentation link

### Key Design Decision: Class Component

`DemoApplication` is a class component rather than a function component. The `HeaderLeft` and `HeaderTitle` subcomponents are extracted as separate function components because React hooks (`useHistory`, `useLocation`) cannot be used inside class component render methods.

### Shared Components

| Component | File | Purpose |
|-----------|------|---------|
| `Page` | `js/components/Page.jsx` | Page-level wrapper with optional `fullScreen` mode for immersive embeds |
| `SimpleSpacer` | `js/components/SimpleSpacer.jsx` | Vertical or horizontal spacing between children; filters null children |
| `WidgetBox` | `js/components/WidgetBox.jsx` | Fixed-dimension container for widgets (`small`, `medium`, `large`, `full`, `auto`) |
| `Swatch` | `js/components/Swatch.jsx` | Color picker input for the ColorService demo |
| `SolutionSpecificDemo` | `js/components/SolutionSpecificDemo.jsx` | Guards demo content by checking if a client module exists for the current solution |

### Demo Page Catalog

| Demo | Route | File | SDK Module | Solution-Gated |
|------|-------|------|-----------|----------------|
| Demo Home | `/demos/` | `js/pages/DemoHome.jsx` | None | No |
| Embedded Planning | `/demos/embedded-planning` | `js/pages/EmbeddedPlanningDemo.jsx` | `EmbeddedPlanning` | No |
| Current Readiness | `/demos/current-readiness` | `js/pages/CurrentReadinessDemo.jsx` | `CurrentReadiness` | Yes |
| Current Readiness (Interactive) | `/demos/current-readiness-interactive` | `js/pages/CurrentReadinessInteractiveDemo.jsx` | `CurrentReadinessInteractive` | Yes |
| Retirement Report Card | `/demos/retirement-report-card` | `js/pages/RetirementReportCardDemo.jsx` | `RetirementReportCard` | Yes |
| Express Workplace Enrollment | `/demos/express-workplace-enrollment` | `js/pages/ExpressWorkplaceEnrollmentDemo.jsx` | `ExpressWorkplaceEnrollment` | Yes |
| Custom Workplace Enrollment (MA) | `/demos/custom-workplace-enrollment-ma` | `js/pages/CustomWorkplaceEnrollmentDemo.jsx` | `CustomWorkplaceEnrollment` | Yes |
| Custom Workplace Enrollment (PITA) | `/demos/custom-workplace-enrollment-pita` | `js/pages/CustomWorkplaceEnrollmentDemo.jsx` | `CustomWorkplaceEnrollment` | Yes |
| Custom Workplace Enrollment (Enroll Method) | `/demos/custom-workplace-enrollment-enroll-method` | `js/pages/CustomWorkplaceEnrollmentDemo.jsx` | `CustomWorkplaceEnrollment` | Yes |
| Copy Helper | `/demos/copy-helper` | `js/pages/CopyHelperDemo.jsx` | `CopyHelper` | No |
| Color Service | `/demos/color-service` | `js/pages/ColorService.jsx` | `ColorService` | No |

## Interfaces

### Inbound

- **Browser navigation** -- Hash-based routes (`/#/demos/embedded-planning`) drive demo page rendering
- **Webpack DefinePlugin globals** -- `NC_ENV` (environment class) and `SOLUTION_ID` (solution identifier) are compile-time constants

### Outbound

- **`@nextcapital/client` SDK** -- `configure()`, `waitForConfiguredClient()`, `getClient()`, `NextCapitalComponent`, and individual module constructors
- **Browser DOM** -- Mounts to `.render-target` element in the HTML shell

## State Management

State is minimal and colocated with the components that need it:

| Component | State | Purpose |
|-----------|-------|---------|
| `DemoApplication` | `isInitializing`, `failedToConfigure` | Gates UI rendering on SDK readiness |
| `ColorService` | `overrides` (Map) | Stages color edits before committing to `ColorService` API |
| `CopyHelperDemo` | `registeredCopy`, `keyToEdit`, `newCopyForKey` | Copy inspection and override form state |
| `CustomWorkplaceEnrollmentEnrollMethodDemoContent` | `embed`, `isEnrolling`, `isSuccess`, `error`, `businessProcessId`, `referenceId` | Async enroll submission lifecycle |

No global state store is used. Each demo manages its own state independently.

## Gotchas and Edge Cases

- **`window._ = _` in index.jsx:** Lodash is exposed on the window for interactive browser console debugging. This is intentional for the demo, not a pattern to replicate in production.
- **Mutable Map in ColorService:** The `overrides` state uses a mutable `Map` instance with `setState({})` to force re-renders. This works but relies on React re-rendering despite no state value change.
- **`SolutionSpecificDemo` uses `getClient()` synchronously:** It assumes the client is already configured. This is safe because it only renders inside `DemoApplication`, which gates on `waitForConfiguredClient()`.
- **Demo callbacks use `alert()` and `console.log()`:** All embed event callbacks in demo pages log or alert rather than implementing real navigation. Partners must replace these with actual application logic.
- **`null` identifiers in demos:** `clientIdentifier` and `planIdentifier` are set to `null` in demo pages, which causes the SDK to use fallback scoping. Production integrations must provide real identifiers.

### Evidence

- `js/index.jsx` -- `configure()` call, `window._` assignment, React root creation
- `js/DemoApplication.jsx` -- `demos` array, route definitions, `waitForConfiguredClient()` lifecycle
- `js/components/SolutionSpecificDemo.jsx` -- `getClient()` module-existence check
- `js/components/Page.jsx` -- `fullScreen` prop for immersive layouts
- `js/components/WidgetBox.jsx` -- Width/height class modifiers
- `js/pages/ColorService.jsx` -- Mutable Map state pattern
- `js/pages/CustomWorkplaceEnrollmentDemo.jsx` -- Hooks-based async lifecycle
