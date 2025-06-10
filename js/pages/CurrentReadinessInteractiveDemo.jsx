/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { NextCapitalComponent } from '@nextcapital/client';
import SolutionSpecificDemo from '../components/SolutionSpecificDemo';

import Page from '../components/Page';
import WidgetBox from '../components/WidgetBox';

const CurrentReadinessInteractiveWidget = () => (
  <WidgetBox width="large" height="auto">
    <NextCapitalComponent
      getEmbed={
        (client) => new client.CurrentReadinessInteractive({
          onNavigateToFullExperience: () => window.alert('should perform SSO to full experience'),
          onNavigateToContributions: () => window.alert('should navigate to the contributions flow'),
          onNavigateToSaveMoreNow: () => window.alert('should navigate to the boost your retirement flow'),
          onError: () => console.error('CurrentReadiness Demo: error occurred!')
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
const CurrentReadinessInteractiveDemo = () => (
  <Page fullScreen>
    <SolutionSpecificDemo
      getChildren={ () => <CurrentReadinessInteractiveWidget /> }
      module="CurrentReadinessInteractive"
    />
  </Page>
);

export default CurrentReadinessInteractiveDemo;
