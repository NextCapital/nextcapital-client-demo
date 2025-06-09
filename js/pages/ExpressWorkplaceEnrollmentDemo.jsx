/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { NextCapitalComponent } from '@nextcapital/client';

import SolutionSpecificDemo from '../components/SolutionSpecificDemo';
import Page from '../components/Page';

const ExpressWorkplaceEnrollmentWidget = () => (
  <NextCapitalComponent
    getEmbed={
      (client) => new client.ExpressWorkplaceEnrollment({
        clientIdentifier: null, // will scope to all accounts, provide in real life
        onNavigateToFullExperience: () => window.alert('should perform SSO to full experience'),
        onEnrolled: () => console.log('ExpressWorkplaceEnrollment Demo: enrollment fully completed!'),
        onEnrollmentStart: () => console.log('ExpressWorkplaceEnrollment Demo: enrollment started!'),
        onError: () => console.error('ExpressWorkplaceEnrollment Demo: error occurred!')
      })
    }
    loadingContent="loading..."
  />
);

/**
 * This demo renders the `ExpressWorkplaceEnrollment` component.
 *
 * @returns {React.Component} The demo element.
 */
const ExpressWorkplaceEnrollmentDemo = () => (
  <Page>
    <SolutionSpecificDemo
      getChildren={ () => <ExpressWorkplaceEnrollmentWidget /> }
      module="ExpressWorkplaceEnrollment"
    />
  </Page>
);

export default ExpressWorkplaceEnrollmentDemo;
