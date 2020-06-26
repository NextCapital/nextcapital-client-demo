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

import { ImplementPlanDemo } from 'nextcapital-client';

import Page from '../components/Page';

/**
 * An embedded application that renders a complete implement plan flow, identical to that
 * of the one in the main NextCapital UI. This includes the DocuSign flow.
 */
class EmbeddedImplementDemo extends React.Component {
  /**
   * When we first render, we need to initialize the app. We can also provide callbacks
   * for when the demo is exited, or the user becomes enrolled.
   */
  componentDidMount() {
    ImplementPlanDemo.configure({
      onExit: () => window.alert('Flow exited!'),
      onEnrolled: () => window.alert('Enrolled!')
    });
  }

  /**
   * Apart from that, just one line of code to render the demo.
   */
  render() {
    return (
      <Page
        title="Embedded Implement Plan"
        fullScreen
      >
        { ImplementPlanDemo.render() }
      </Page>
    );
  }
}

export default EmbeddedImplementDemo;
