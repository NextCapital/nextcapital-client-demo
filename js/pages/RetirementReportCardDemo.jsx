/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { NextCapitalComponent } from '@nextcapital/client';
import SolutionSpecificDemo from '../components/SolutionSpecificDemo';

import Page from '../components/Page';
import SimpleSpacer from '../components/SimpleSpacer';
import WidgetBox from '../components/WidgetBox';

const RetirementReportCardWidget = ({ context = null, title }) => (
  <div>
    <h2>{ title }</h2>
    <WidgetBox width="small" height="auto">
      <NextCapitalComponent
        getEmbed={
          (client) => new client.RetirementReportCard({
            context,
            onButtonClick: (targetState) => window.alert(
              `button clicked! expected to perform SSO for target state: ${targetState}`
            ),
            onError: () => console.error('RetirementReportCard Demo: error occurred!')
          })
        }
        loadingContent="loading..."
      />
    </WidgetBox>
  </div>
);

const AllRetirementReportCardContexts = () => (
  <SimpleSpacer>
    <RetirementReportCardWidget title="Full Retirement Report Card (No Context)" />
    <RetirementReportCardWidget context="funding" title="Funding Context" />
    <RetirementReportCardWidget context="savings" title="Savings Context" />
    <RetirementReportCardWidget context="assetAllocation" title="Asset Allocation Context" />
  </SimpleSpacer>
);

/**
 * This demo renders the Retirement Report Card widget using `NextCapitalComponent`.
 *
 * @returns {React.Component} The demo element.
 */
const RetirementReportCardDemo = () => (
  <Page>
    <SolutionSpecificDemo
      getChildren={ () => <AllRetirementReportCardContexts /> }
      module="RetirementReportCard"
    />
  </Page>
);

export default RetirementReportCardDemo;
