/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { NextCapitalComponent } from '@nextcapital/client';

import SolutionSpecificDemo from '../components/SolutionSpecificDemo';
import Page from '../components/Page';

const StubExpressWorkplaceEnrollmentWidget = () => (
  <NextCapitalComponent
    getEmbed={
      (client) => new client.ExpressWorkplaceEnrollment({
        useStub: true,
        clientIdentifier: null, // will scope to all accounts, provide in real life
        onNavigateToFullExperience: () => window.alert('should perform SSO to full experience'),
        onEnrolled: () => console.log('ExpressWorkplaceEnrollment Demo: enrollment fully completed!'),
        onEnrollmentStart: () => console.log('ExpressWorkplaceEnrollment Demo: enrollment started!'),
        onError: () => console.log('ExpressWorkplaceEnrollment Demo: error occurred!')
      })
    }
    loadingContent="loading..."
  />
);

/**
 * This demo renders the STUB VERSION of the `ExpressWorkplaceEnrollment` component.
 *
 * NOTE: This will eventually be removed.
 *
 * @returns {React.Component} The demo element.
 */
const StubExpressWorkplaceEnrollmentDemo = () => (
  <Page>
    <SolutionSpecificDemo
      getChildren={ () => <StubExpressWorkplaceEnrollmentWidget /> }
      module="ExpressWorkplaceEnrollment"
    />
  </Page>
);

export default StubExpressWorkplaceEnrollmentDemo;
