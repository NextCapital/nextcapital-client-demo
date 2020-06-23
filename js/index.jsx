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
