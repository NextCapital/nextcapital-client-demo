/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { NextCapitalComponent } from '@nextcapital/client';

import SolutionSpecificDemo from '../components/SolutionSpecificDemo';
import Page from '../components/Page';

const CustomWorkplaceEnrollmentWidget = ({ productKind }) => (
  <NextCapitalComponent
    getEmbed={
      (client) => new client.CustomWorkplaceEnrollment({
        clientIdentifier: null, // will scope to all accounts, provide in real life
        planIdentifier: null, // will scope to first RK account, provide in real life
        productKind,
        stagedContributions: {
          taxDeferred: {
            basis: 'percent',
            value: 0.01
          },
          afterTaxDeferred: {
            basis: 'percent',
            value: 0.02
          },
          taxFree: {
            basis: 'amount',
            value: 1000
          }
        },
        onComplete: (allocations) => {
          console.log('allocations', allocations);
          window.alert('CustomWorkplaceEnrollment: complete button clicked, check console for allocations');
        },
        onExternalBack: () => window.alert('CustomWorkplaceEnrollment: back button clicked'),
        onExternalCancel: () => window.alert('CustomWorkplaceEnrollment: cancel button clicked'),
        onError: () => console.error('CustomWorkplaceEnrollment Demo: error occurred!')
      })
    }
    loadingContent="loading..."
  />
);

/**
 * This demo renders the `CustomWorkplaceEnrollment` component.
 *
 * @returns {React.Component} The demo element.
 */
const CustomWorkplaceEnrollmentDemo = ({ productKind }) => (
  <Page>
    <SolutionSpecificDemo
      getChildren={ () => <CustomWorkplaceEnrollmentWidget productKind={ productKind } /> }
      module="CustomWorkplaceEnrollment"
    />
  </Page>
);

export const ManagedCustomWorkplaceEnrollmentDemo = () => (
  <CustomWorkplaceEnrollmentDemo productKind="managed_accounts" />
);

export const PointInTimeCustomWorkplaceEnrollmentDemo = () => (
  <CustomWorkplaceEnrollmentDemo productKind="point_in_time_advice" />
);

export default CustomWorkplaceEnrollmentDemo;
