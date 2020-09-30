import React from 'react';

import { NextCapitalComponent } from '@nextcapital/client';

import Page from '../components/Page';

const EmbeddedPlanningDemo = () => (
  <Page fullScreen>
    <NextCapitalComponent
      getEmbed={
        (client) => new client.EmbeddedPlanning({
          onExit: () => window.alert('exit callback called'),
          onEnrollment: () => window.alert('enrollment callback called')
        })
      }
      loadingContent={ 'loading...' }
    />
  </Page>
);

export default EmbeddedPlanningDemo;
