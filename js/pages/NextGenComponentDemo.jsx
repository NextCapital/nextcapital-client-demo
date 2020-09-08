/**
 * Copyright Notice
 * Copyright (c) 2020 NextCapital Group. All Rights Reserved.
 *
 * THIS IS UNPUBLISHED CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF NEXTCAPITAL GROUP.
 *
 * The copyright notice above does not evidence any actual or intended publication
 * of such source code.
 *
 * Copyright (c) 2020
 * NextCapital Group
 * All Rights Reserved.
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 * CONFIDENTIAL AND PROPRIETARY NOTICE
 * This source code is unpublished confidential and proprietary information constituting,
 * or derived under license from NextCapital Group's software.
 */

import React from 'react';

import { NextGenDemo } from 'nextcapital-client';

import Page from '../components/Page';

/**
 * Some partners have expressed interest in using a Web Component to render embedded content.
 * It is indeed easy to wrap embedded content in a web component, as this example does.
 *
 * Some notes:
 *
 * - Please see: https://reactjs.org/docs/web-components.html
 * - We are still doing `import React from 'react'` in this file, the web component does not on its
 *   own solve dependency incompatibilities. To solve this issue, NextCapital would need to fully
 *   bundle React with the client (even if the parent application already uses it).
 * - This is not ideal for a few reasons:
 *   - It increases the size of the client significantly to have React bundled
 *   - We expect most partners will already be using React: causing it to download twice if we did
 *     this. We also expect most partners will render embedded content into an existing React tree.
 *   - For partners who do directly embed the React tree, using a different React instance can
 *     cause issues (upgrading to React 17, once released, will help resolve)
 * - Instead, the production-ready client will likely list React as a dependency. This will cause
 *   it to use the parent applications version of React (if compatible) or install it anew if the
 *   parent application currently does not use it.
 *   - `npm` should only have multiple versions of React installed if the parent application and
 *     client dependencies are incompatible. This is a situation we would try to avoid.
 *   - Major React versions are infrequent. This should only happen around once a year.
 *   - NextCapital intends to be proactive about updating to newer versions. As we do, the
 *     dependencies for the embedded client will also be updated.
 *   - We would communicate any major React/etc... version changes in advance. Our expectation
 *     is that partners would also stay up-to-date.
 * - This is a common pattern for using third-party React components.
 *   - See, for example, the `package.json` for the popular `react-router` library this demo
 *     uses: https://github.com/ReactTraining/react-router/blob/master/package.json#L39
 * - Under no circumstances will NextCapital use anything other than React to render our content.
 *
 * You'll also notice that we are not using the Shadow DOM here:
 *
 * - Shadow DOM is almost, but not quite, ready for use cross-browser without polyfills.
 *   - https://caniuse.com/shadowdomv1
 *   - Safari has some known issues
 *   - The spec is overall still experimental not yet finalized.
 * - React 16 has some known issues with events and the shadow DOM
 * - We use React portals for popups, tooltips, etc... and these are currently not functioning
 *   when shadow DOM is used.
 *   - Even if they were working, popups/etc... must attach to the main root in order to
 *     render properly.
 *   - Thus, we need to include CSS on both the main page (for popups/etc...) and the shadow DOM.
 *   - This need to attach CSS to the "light DOM" sort of defeats the purpose of using the shadow
 *     DOM in the first place.
 * - Popups have complex accessibility code that may not function correctly when shadow DOM is used.
 *
 * So, overall:
 *
 * - There is no need for NextCapital to provide web components of its own. However, it is easy
 *   to use the NextCapital client with partner-implemented web components (just as it is easy to
 *   use with any other UI library).
 * - Web components by themselves do not solve dependency incompatibility issues. An independent web
 *   component depends upon the NextCapital client itself not having any external dependencies.
 * - There are definite advantages and drawbacks to to using external dependencies. Our assesment
 *   is that the advantages outweigh the drawbacks.
 * - The shadow DOM is probably not yet feasible to use at this time. Future versions of React may
 *   change this.
 *
 * If any of this still causes concerns, feel free to contact us.
 */
class NextGenComponent extends HTMLElement {
  constructor() {
    super();

    NextGenDemo.configure({
      onExit: () => window.alert('Flow exited!'),
      onEnrolled: () => window.alert('Enrolled!')
    });

    NextGenDemo.renderRoot(this);
  }
}

customElements.define('nextcapital-next-gen', NextGenComponent);

/**
 * React will render the native `nextcapital-next-gen` element here. You can use any library
 * to render the custom element.
 */
const NextGenComponentDemo = () => (
  <Page
    title="NextGen UI (Web Component)"
    fullScreen
  >
    <nextcapital-next-gen />
  </Page>
);

export default NextGenComponentDemo;

