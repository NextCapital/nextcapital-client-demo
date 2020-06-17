import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import moment from 'moment';
import Highcharts from 'highcharts';

import { ApiClient, configure, startSession, authenticateSession } from 'nextcapital-client';

import environments from './environments';
import copy from './copy';

import DemoApplication from './DemoApplication';

// Expose these on the window for use with the javascript console
window._ = _;
window.NCApiClient = ApiClient;

// The NextCapital client should be immediately initialized
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
