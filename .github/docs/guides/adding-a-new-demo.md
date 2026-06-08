# Guide: Adding a New Demo Page

## Why This Guide Exists

New SDK features are added frequently; this demo must be updated to showcase them. This guide covers the steps to add a new demo page following established patterns.

## Prerequisites

- The SDK module you want to demo is available in the installed version of `@nextcapital/client`
- You know whether the module is solution-specific (not available for all solutions)

## Steps

### Create the Demo Page Component

Create a new file in `js/pages/`. Follow the naming convention: `<ModuleName>Demo.jsx`.

**For a standard widget embed** (the most common pattern), use this template:

```jsx
import React from 'react';

import { NextCapitalComponent } from '@nextcapital/client';

import SolutionSpecificDemo from '../components/SolutionSpecificDemo';
import Page from '../components/Page';
import WidgetBox from '../components/WidgetBox';

/**
 * This demo renders the <ModuleName> widget using `NextCapitalComponent`.
 *
 * @returns {React.Component} The demo element.
 */
function ModuleNameDemo() {
  return (
    <SolutionSpecificDemo
      module="ModuleName"
      getChildren={ () => (
        <Page fullScreen>
          <WidgetBox width="medium" height="auto">
            <NextCapitalComponent
              getEmbed={ (client) => new client.ModuleName({
                // Required callbacks - replace alerts with real logic
                onError: (error) => console.error('Error:', error)
              }) }
              loadingContent={ 'loading...' }
            />
          </WidgetBox>
        </Page>
      ) }
    />
  );
}

export default ModuleNameDemo;
```

**Key decisions:**

| Decision | Options | Guidance |
|----------|---------|----------|
| Solution gating | Wrap in `SolutionSpecificDemo` or not | Use `SolutionSpecificDemo` if the module may not exist for all solutions |
| Layout | `Page` vs `Page fullScreen` | Use `fullScreen` for large-scale or full-screen embeds; omit for widgets |
| Sizing | `WidgetBox` width/height | Use for constrained widgets; omit for full-screen embeds |
| Spacing | `SimpleSpacer` | Use when showing multiple variants of the same widget |

### Register the Route

In `js/DemoApplication.jsx`:

1. Import the new demo component at the top of the file:

```jsx
import ModuleNameDemo from './pages/ModuleNameDemo';
```

2. Add an entry to the `demos` array:

```jsx
{ name: 'Module Name', route: '/demos/module-name', component: ModuleNameDemo },
```

The `name` appears in the header dropdown. The `route` must start with `/demos/` and use kebab-case.

### Add Styling (if needed)

If the new demo needs custom styles beyond what `Page`, `WidgetBox`, and `SimpleSpacer` provide, add CSS classes to `styles/demo.scss`. Follow the existing `.demo-*` naming convention.

### Verify

1. Run `npm run start -- --solution=<solution> --exchange-token=<token>`
2. Navigate to the new demo in the dropdown
3. Verify the widget renders correctly
4. If the demo is solution-gated, test with a solution that does not support the module to verify the fallback message appears
5. Run `npm run lint` to check for lint errors

## Variations

### Multiple Widget Variants

To show multiple configurations of the same widget (e.g., compact vs. non-compact), create a wrapper component and use `SimpleSpacer`. See `js/pages/CurrentReadinessDemo.jsx` for the canonical example.

### Imperative Method Demos

If the embed exposes methods the host can call (like `CustomWorkplaceEnrollment.enroll()`), build a separate component using React hooks with `waitForConfiguredClient()`. See `CustomWorkplaceEnrollmentEnrollMethodDemoContent` in `js/pages/CustomWorkplaceEnrollmentDemo.jsx`.

### Service Demos (Non-Widget)

For demos that use client services rather than embeds (like `ColorService` or `CopyHelper`), use `getClient()` directly instead of `NextCapitalComponent`. See `js/pages/ColorService.jsx` and `js/pages/CopyHelperDemo.jsx`.

## Files That Change

| File | Change |
|------|--------|
| `js/pages/<ModuleName>Demo.jsx` | New file: demo page component |
| `js/DemoApplication.jsx` | Import + `demos` array entry |
| `styles/demo.scss` | New CSS classes (only if needed) |

### Evidence

- `js/DemoApplication.jsx` -- `demos` array structure and route registration
- `js/pages/EmbeddedPlanningDemo.jsx` -- Simplest full-screen embed demo
- `js/pages/CurrentReadinessDemo.jsx` -- Multiple widget variants with `SimpleSpacer`
- `js/pages/CustomWorkplaceEnrollmentDemo.jsx` -- Multiple exports, imperative method demo
- `js/pages/ColorService.jsx` -- Service demo using `getClient()` directly
