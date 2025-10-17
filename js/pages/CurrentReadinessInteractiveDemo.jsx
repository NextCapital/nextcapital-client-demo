/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { NextCapitalComponent } from '@nextcapital/client';
import SolutionSpecificDemo from '../components/SolutionSpecificDemo';

import Page from '../components/Page';
import WidgetBox from '../components/WidgetBox';

const CurrentReadinessInteractiveWidget = ({ planIdentifier }) => (
  <WidgetBox width="large" height="auto">
    <NextCapitalComponent
      key={ planIdentifier } // force remount when toggled
      getEmbed={
        (client) => new client.CurrentReadinessInteractive({
          onNavigateToFullExperience: () => window.alert('should perform SSO to full experience'),
          onNavigateToContributions: () => window.alert('should navigate to the contributions flow'),
          onNavigateToSaveMoreNow: () => window.alert('should navigate to the boost your retirement flow'),
          onError: () => console.error('CurrentReadiness Demo: error occurred!'),

          // will scope to first eligible RK account when null, provide in real life
          clientIdentifier: '19943',
          planIdentifier
        })
      }
      loadingContent="loading..."
    />
  </WidgetBox>
);

/**
 * This demo renders the interactive current readiness widget UI using `NextCapitalComponent`.
 *
 * @returns {React.Component} The demo element.
 */
const CurrentReadinessInteractiveDemo = () => {
  const [planIdentifier, setPlanIdentifier] = React.useState('10');
  const togglePlan = () => setPlanIdentifier((prev) => (prev === '10' ? '8764' : '10'));

  return (
    <Page fullScreen>
      <SolutionSpecificDemo
        getChildren={ () => (
          <React.Fragment>
            <div style={ { marginBottom: 12 } }>
              <strong>Current planIdentifier:</strong>
{' '}
{ planIdentifier }
{' '}
              <button type="button" onClick={ togglePlan }>
                Toggle planIdentifier
              </button>
            </div>
            <CurrentReadinessInteractiveWidget planIdentifier={ planIdentifier } />
          </React.Fragment>
        ) }
        module="CurrentReadinessInteractive"
      />
    </Page>
  );
};

export default CurrentReadinessInteractiveDemo;
