/* eslint-disable no-console */
import React from 'react';

import { NextCapitalComponent } from '@nextcapital/client';

import Page from '../components/Page';

/**
 * This demo renders the planning UI using `NextCapitalComponent`.
 *
 * It really is this easy!
 *
 * @returns {React.Component} the demo
 */
const EmbeddedPlanningDemo = () => (
  <Page fullScreen>
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
  </Page>
);

export default EmbeddedPlanningDemo;
