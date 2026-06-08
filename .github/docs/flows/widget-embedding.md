# Runtime Flow: Widget Embedding

## Trigger

- **Type:** User navigation to a demo page
- **Location:** Hash route change (e.g., `/#/demos/current-readiness`) handled by `js/DemoApplication.jsx`

## Why This Flow Matters

Embedding a NextCapital widget is the core integration task for partners. Understanding the `NextCapitalComponent` lifecycle and `getEmbed` factory pattern is essential for correct integration. This flow documents the pattern used by every demo page and variations between widget types.

## Sequence Diagram

```d2
direction: right

user: User
router: HashRouter
page: Demo Page
ncc: NextCapitalComponent
sdk: SDK Client
embed: Embed Instance

user -> router: "Navigate to demo"
router -> page: "Render demo component"
page -> ncc: "Render with getEmbed"
ncc -> sdk: "waitForConfiguredClient()"
sdk -> ncc: "Client ready"
ncc -> embed: "getEmbed(client)"
embed -> ncc: "Embed instance"
ncc -> user: "Rendered widget"
```

## Narrative

### Standard Widget Embed Pattern

1. User selects a demo from the header dropdown, triggering a hash route change
2. `HashRouter` matches the route and renders the corresponding demo page component -- `js/DemoApplication.jsx` (`renderCurrentDemo`)
3. The demo page renders a `NextCapitalComponent` with two required props:
   - `getEmbed`: a factory function `(client) => new client.ModuleName({...options})`
   - `loadingContent`: placeholder content shown during initialization
4. `NextCapitalComponent` (SDK internal) waits for the client to be configured and authenticated
5. Once ready, it calls `getEmbed(client)` to create the embed instance
6. The embed instance renders into the DOM managed by `NextCapitalComponent`

### Widget Wrapping Pattern

Demo pages compose several layout components around `NextCapitalComponent`:

- **`Page`** provides page-level padding or `fullScreen` mode (removes padding and scroll for immersive embeds)
- **`WidgetBox`** constrains widget dimensions with CSS classes (`width-small`, `width-medium`, `width-large`)
- **`SimpleSpacer`** adds vertical or horizontal spacing when showing multiple widget variants
- **`SolutionSpecificDemo`** gates the entire render on module availability for the current solution

### Solution-Specific Gating

Some SDK modules are only available for certain solutions. `SolutionSpecificDemo` prevents runtime errors by checking `getClient()[moduleName]` before rendering:

- If the module exists: renders the children via `getChildren()` callback
- If the module is missing: renders a fallback message ("Sorry, this demo is not available for the current solution")

Modules gated this way: `CurrentReadiness`, `CurrentReadinessInteractive`, `RetirementReportCard`, `ExpressWorkplaceEnrollment`, `CustomWorkplaceEnrollment`.

### Embed Callback Pattern

Every embed constructor receives callback functions that the host application implements. In this demo, all callbacks use `alert()` or `console.log()` to demonstrate the integration point. Partners must replace these with real application logic (navigation, analytics, error handling).

Common callback categories:

| Callback Type | Purpose | Example |
|--------------|---------|---------|
| Navigation | User wants to leave the embed or go to another view | `onExit`, `onNavigateToFullExperience` |
| Lifecycle | Enrollment or unenrollment state changed | `onEnrolled`, `onUnenrolled`, `onEnrollmentStart` |
| Error | Something went wrong in the embed | `onError` |
| Action | User performed a specific action | `onButtonClick`, `onComplete` |

### Imperative Embed Method Pattern

`CustomWorkplaceEnrollment` exposes an `enroll(businessProcessId, referenceId)` method that the host calls after receiving allocation data via `onComplete`. This pattern is demonstrated in `CustomWorkplaceEnrollmentEnrollMethodDemoContent`:

1. `waitForConfiguredClient()` resolves
2. Embed instance is created via `buildCustomEnrollmentEmbed()` and stored in React state
3. User fills in `businessProcessId` and `referenceId` form fields
4. On submit, `embed.enroll(businessProcessId, referenceId)` is called
5. Result is tracked via `isEnrolling`, `isSuccess`, and `error` state

This is the only demo that stores an embed instance in component state and calls methods on it directly, rather than using `NextCapitalComponent` exclusively.

### Full-Screen vs Widget Sizing

| Embed Type | Layout |
|-----------|--------|
| `EmbeddedPlanning` | `Page fullScreen` -- no padding, no scroll, full viewport |
| `ExpressWorkplaceEnrollment` | `Page fullScreen` -- full width, dynamic height |
| `CustomWorkplaceEnrollment` | `Page fullScreen` -- full width, dynamic height |
| `CurrentReadiness` | `WidgetBox width="medium" height="auto"` -- constrained box |
| `CurrentReadinessInteractive` | `WidgetBox width="large" height="auto"` -- larger constrained box |
| `RetirementReportCard` | `WidgetBox width="small" height="auto"` -- small constrained box |

Full-screen embeds require all parent containers from the embed up to `<html>` to have explicit non-auto heights. The demo stylesheet (`styles/demo.scss`) ensures this via `html, body, .render-target, .demo-application { width: 100%; height: 100%; }`.

## Gotchas and Edge Cases

- **`getEmbed` is called once:** `NextCapitalComponent` calls `getEmbed` when the client is ready. The factory function should not have side effects or depend on changing props.
- **Singular embeds share state:** Most embeds are flagged as `isSingular`, meaning repeated mounts reuse the same internal state. Only `RetirementReportCard` supports true multi-instance rendering.
- **`null` identifiers trigger fallback scoping:** Setting `clientIdentifier` or `planIdentifier` to `null` in demos causes the SDK to auto-select accounts. Production code must provide real identifiers.
- **Auto-escalation in staged contributions:** `escalationRate` and `targetRate` must be provided together and only for non-catchup tax treatments.

### Evidence

- `js/pages/EmbeddedPlanningDemo.jsx` -- Simplest `NextCapitalComponent` + `getEmbed` pattern
- `js/pages/CurrentReadinessDemo.jsx` -- Widget variant rendering with `WidgetBox` and `SimpleSpacer`
- `js/pages/CustomWorkplaceEnrollmentDemo.jsx` -- `buildCustomEnrollmentEmbed()`, imperative `enroll()` method, hooks-based lifecycle
- `js/components/SolutionSpecificDemo.jsx` -- Module-existence gating via `getClient()`
- `js/components/Page.jsx` -- `fullScreen` prop
- `js/components/WidgetBox.jsx` -- Width/height CSS class construction
- `styles/demo.scss` -- Full-height layout chain and `.widget-box` sizing classes
