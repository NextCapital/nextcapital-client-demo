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

import { PlanningAppDemo } from 'nextcapital-client';

import Page from '../components/Page';

/**
 * It is even possible to embed an entire application, with just a few lines of code!
 *
 * As we update the update the application, a consuming application would get an updates or
 * bugfixes automatically. Breaking changes to the consuming application would be extremely
 * rare.
 *
 * NOTE: This is a incomplete demo app, designed to show the NextGen summary page with a button that
 * launches PIO for retail users. Some functionality may be missing or broken. This is not
 * representative of a final/shipping/real product.
 */
class EmbeddedPlanningAppDemo extends React.Component {
  /**
   * We need to initialize the app when it first renders.
   */
  componentDidMount() {
    PlanningAppDemo.configure({
      onExit: () => window.alert('Flow exited!'),
      onEnrolled: () => window.alert('Enrolled!')
    });
  }

  /**
   * Apart from that, just a single line of code to render.
   */
  render() {
    return (
      <Page
        title="Planning & Advice (Retail)"
        fullScreen
      >
        { PlanningAppDemo.render() }
      </Page>
    );
  }
}

export default EmbeddedPlanningAppDemo;
