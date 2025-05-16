import React from 'react';

import { NextCapitalComponent } from '@nextcapital/client';

import Page from '../components/Page';

/**
 * This demo renders the `ExpressWorkplaceEnrollment` component.
 *
 * @returns {React.Component} The demo element.
 */
const ExpressWorkplaceEnrollmentDemo = () => (
  <Page>
    <NextCapitalComponent
      getEmbed={
        (client) => new client.ExpressWorkplaceEnrollment({
          onNavigateToFullExperience: () => window.alert('should perform SSO to full experience'),
          onEnrolled: () => console.log('ExpressWorkplaceEnrollment Demo: enrollment fully completed!'),
          onEnrollmentStart: () => console.log('ExpressWorkplaceEnrollment Demo: enrollment started!'),
          onError: () => console.log('ExpressWorkplaceEnrollment Demo: error occurred!')
        })
      }
      loadingContent="loading..."
    />
  </Page>
);

export default ExpressWorkplaceEnrollmentDemo;
