import React from 'react';
import ReactDOM from 'react-dom/client';
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
    environmentClass: ENVIRONMENT_CLASS[NC_ENV],
    accessType: ENVIRONMENT_ACCESS_TYPE.PROXY,
    trackingEnabled: true,
    endpoint: '/api'
  },
  solutionId: SOLUTION_ID // set from webpack
});

// Wait for the page to be ready, then render the application...
window.addEventListener('DOMContentLoaded', () => {
  const root = ReactDOM.createRoot(document.querySelector('.render-target'));
  root.render(
    <DemoApplication />,
  );
});
