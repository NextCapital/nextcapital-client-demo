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
import ReactDOM from 'react-dom';
import _ from 'lodash';

import {
  configure,
  ENVIRONMENT_CLASS,
  ENVIRONMENT_ACCESS_TYPE
} from '@nextcapital/client';

import DemoApplication from './DemoApplication';

// Expose on the window for use with the javascript console
window._ = _;

// The NextCapital Client should be immediately configured, before any other code runs
configure({
  environment: {
    environmentClass: ENVIRONMENT_CLASS.DEVELOPMENT, // NC Devs: Change to `DEVELOPMENT`
    accessType: ENVIRONMENT_ACCESS_TYPE.PROXY,
    trackingEnabled: true,
    endpoint: '/api',
    authEndpoint: '/as/token.oauth2'
  },
  solutionId: SOLUTION_ID // set from webpack
});

// Wait for the page to be ready, then render the application...
window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <DemoApplication />,
    document.querySelector('.render-target')
  );
});
