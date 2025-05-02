import React from 'react';

import { NextCapitalComponent } from '@nextcapital/client';
import SolutionSpecificDemo from '../components/SolutionSpecificDemo';

import Page from '../components/Page';
import WidgetBox from '../components/WidgetBox';

const RetirementReportCardWidget = () => (
  <WidgetBox width='small' height='auto'>
    <NextCapitalComponent
      getEmbed={
        (client) => new client.RetirementReportCard({
          onButtonClick: () => window.alert('button clicked!')
        })
      }
      loadingContent="loading..."
    />
  </WidgetBox>
);

/**
 * This demo renders the planning UI using `NextCapitalComponent`.
 *
 * It really is this easy!
 *
 * @returns {React.Component} The demo element.
 */
const RetirementReportCardDemo = () => (
  <Page fullScreen>
    <SolutionSpecificDemo
      getChildren={ () => <RetirementReportCardWidget /> }
      module='RetirementReportCard'
    />
  </Page>
);

export default RetirementReportCardDemo;
