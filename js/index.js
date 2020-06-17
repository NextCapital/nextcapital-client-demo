import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import moment from 'moment';
import Highcharts from 'highcharts';

import { ApiClient, configure, startSession, authenticateSession } from 'nextcapital-client';

import environments from './environments';
import copy from './copy';

// Expose these on the window for use with the javascript console
window._ = _;
window.NCApiClient = ApiClient;

console.log('Configuring NextCapital Client...');
configure({
  environment: environments[process.env.NC_ENV],
  copy: copy
});

console.log('Start NextCapital Client session...');
startSession({
  onCookiesDisabled: () => window.alert('Cookies disabled! Auth will not work.'),
  onNeedsAuth: () => authenticateSession({ username: 'advisor@transamerica.com', password: 'Password2' })
}).then(() => {
  console.log('NextCapital Client session is ready!');
}).catch((ex) => {
  console('NextCapital Client failed to start session....');
  console.error(ex);
});
