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

// These are the externals you will need to provide the client
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import moment from 'moment';
import Highcharts from 'highcharts';

import { ApiClient, configure } from 'nextcapital-client';

import environments from './environments';
import copy from './copy';

import DemoApplication from './DemoApplication';

// Expose these on the window for use with the javascript console
window._ = _;
window.NCApi = ApiClient;

// The NextCapital client should be immediately configured, before any other code runs
console.log('Configuring NextCapital Client...');
configure({
  environment: environments[process.env.NC_ENV],
  copy: copy
});

// Wait for the page to be ready, then render the application...
window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <DemoApplication />,
    document.querySelector('.render-target')
  );
});
