/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { NextCapitalComponent } from '@nextcapital/client';
import SolutionSpecificDemo from '../components/SolutionSpecificDemo';

import Page from '../components/Page';
import SimpleSpacer from '../components/SimpleSpacer';
import WidgetBox from '../components/WidgetBox';

const CurrentReadinessWidget = ({ title, useCompactStyle = false }) => (
  <div>
    <h2>{ title }</h2>
    <WidgetBox width="medium" height="auto">
      <NextCapitalComponent
        getEmbed={
          (client) => new client.CurrentReadiness({
            useCompactStyle,
            onNavigateToFullExperience: () => window.alert('personalize button clicked!'),
            onNavigateToInteractive: () => window.alert('do better button clicked!'),
            onNavigateToSaveMoreNow: () => window.alert('save more now button clicked!'),
            onError: () => console.error('CurrentReadiness Demo: error occurred!')
          })
        }
        loadingContent="loading..."
      />
    </WidgetBox>
  </div>
);

const AllCurrentReadinessWidgetStyles = () => (
  <SimpleSpacer>
    <CurrentReadinessWidget title="Non-Compact Style" />
    <CurrentReadinessWidget title="Compact Style" useCompactStyle />
  </SimpleSpacer>
);

/**
 * This demo renders the current readiness widget UI using `NextCapitalComponent`.
 *
 * @returns {React.Component} The demo element.
 */
const CurrentReadinessDemo = () => (
  <Page fullScreen>
    <SolutionSpecificDemo
      getChildren={ () => <AllCurrentReadinessWidgetStyles /> }
      module="CurrentReadiness"
    />
  </Page>
);

export default CurrentReadinessDemo;
