/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';

import { NextCapitalComponent, waitForConfiguredClient } from '@nextcapital/client';

import SolutionSpecificDemo from '../components/SolutionSpecificDemo';
import Page from '../components/Page';

const buildCustomEnrollmentEmbed = (client, productKind) => (
  new client.CustomWorkplaceEnrollment({
    clientIdentifier: null, // will scope to all accounts, provide in real life
    planIdentifier: null, // will scope to first RK account, provide in real life
    productKind,
    stagedContributions: {
      taxDeferred: {
        basis: 'percent',
        value: 0.02
      },
      afterTaxDeferred: {
        basis: 'percent',
        value: 0.01
      },
      taxFree: {
        basis: 'amount',
        value: 1000
      },
      taxDeferredCatchup: {
        basis: 'amount',
        value: 500
      },
      taxFreeCatchup: {
        basis: 'percent',
        value: 0.01
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
);

const CustomWorkplaceEnrollmentWidget = ({ productKind }) => (
  <NextCapitalComponent
    getEmbed={ (client) => buildCustomEnrollmentEmbed(client, productKind) }
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

const CustomWorkplaceEnrollmentEnrollMethodDemoContent = () => {
  const [businessProcessId, setBusinessProcessId] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [embed, setEmbed] = useState(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEmbed = async () => {
      const client = await waitForConfiguredClient();
      setEmbed(
        buildCustomEnrollmentEmbed(
          client,
          client.CustomWorkplaceEnrollment.PRODUCT_KINDS.MANAGED_ACCOUNTS
        )
      );
    };

    loadEmbed();
  }, []);

  const submit = async () => {
    setIsEnrolling(true);

    try {
      await embed.enroll(businessProcessId, referenceId);
      setIsSuccess(true);
    } catch (ex) {
      console.error(ex);
      setError(ex);
    } finally {
      setIsEnrolling(false);
    }
  };

  if (!embed) {
    return 'loading...';
  }

  return (
    <div>
      <p>Enter a business process ID and reference ID below to trigger an enrollment.</p>
      <input
        type="text"
        value={ businessProcessId }
        onChange={ ({ target }) => setBusinessProcessId(target.value) }
        placeholder="enter business process id..."
        disabled={ isEnrolling || isSuccess || error }
      />
      <input
        type="text"
        value={ referenceId }
        onChange={ ({ target }) => setReferenceId(target.value) }
        placeholder="enter reference id..."
        disabled={ isEnrolling || isSuccess || error }
      />
      <button
        onClick={ submit }
        type="submit"
        disabled={ isEnrolling || isSuccess || error || !businessProcessId || !referenceId }
      >
        Submit
      </button>
      { isEnrolling && <p>submitting the enrollment...</p> }
      { isSuccess && <p>enrollment started successfully!</p> }
      { error && <p>an error has occurred... check the console for more.</p> }
    </div>
  );
};

export const CustomWorkplaceEnrollmentEnrollMethodDemo = () => (
  <Page>
    <SolutionSpecificDemo
      getChildren={ () => <CustomWorkplaceEnrollmentEnrollMethodDemoContent /> }
      module="CustomWorkplaceEnrollment"
    />
  </Page>
);

export default CustomWorkplaceEnrollmentDemo;
