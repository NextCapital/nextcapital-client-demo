import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  configure,
  ENVIRONMENT_CLASS,
  ENVIRONMENT_ACCESS_TYPE,
  NextCapitalComponent
} from '@nextcapital/client';

// The NextCapital Client should be configured ASAP in the flow
configure({
  environment: {
    environmentClass: ENVIRONMENT_CLASS.SIT, // TODO: Set the environment correctly
    accessType: ENVIRONMENT_ACCESS_TYPE.PROXY,
    trackingEnabled: true,
    endpoint: '/your-api-proxy-here' // TODO: Set the proxy endpoint correctly
  },
  solutionId: 'your-solution-here' // TODO: set the solutionId properly
});

// This React component renders the NextCapital Embedded UI
// TODO: Define actual callbacks and loading content
const DemoApplication = () => (
  <NextCapitalComponent
    getEmbed={
      (client) => new client.EmbeddedPlanning({
        onExit: () => console.log('Planning Demo: exit callback called'),
        onEnrolled: () => console.log('Planning Demo: enrollment callback called'),
        onEnrollmentStart: () => console.log('Planning Demo: enrollment start callback called'),
        onUnenrolled: () => console.log('Planning Demo: unenrollment callback called'),
        onUnenrollmentStart: () => console.log('Planning Demo: unenrollment start callback called'),
        onError: () => console.log('Planning Demo: an error has occurred')
      })
    }
    loadingContent={ 'loading...' }
  />
);

// Wait for the page to be ready, then render the application...
window.addEventListener('DOMContentLoaded', () => {
  const root = ReactDOM.createRoot(
    document.querySelector('.render-target') // TODO: target correct element
  );

  root.render(
    <DemoApplication />
  );
});

