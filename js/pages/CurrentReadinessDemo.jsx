/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { NextCapitalComponent } from '@nextcapital/client';
import SolutionSpecificDemo from '../components/SolutionSpecificDemo';

import Page from '../components/Page';
import WidgetBox from '../components/WidgetBox';

const CurrentReadinessWidget = () => (
  <WidgetBox width="medium" height="auto">
    <NextCapitalComponent
      getEmbed={
        (client) => new client.CurrentReadiness({
          onNavigateToFullExperience: () => window.alert('personalize button clicked!')
        })
      }
      loadingContent="loading..."
    />
  </WidgetBox>
);

/**
 * This demo renders the current readiness widget UI using `NextCapitalComponent`.
 *
 * @returns {React.Component} The demo element.
 */
const CurrentReadinessDemo = () => (
  <Page fullScreen>
    <SolutionSpecificDemo
      getChildren={ () => <CurrentReadinessWidget /> }
      module="CurrentReadiness"
    />
  </Page>
);

export default CurrentReadinessDemo;
