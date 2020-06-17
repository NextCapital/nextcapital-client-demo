import React from 'react';

import { ImplementPlanDemo } from 'nextcapital-client';

import Page from '../components/Page';

class EmbeddedImplementDemo extends React.Component {
  componentDidMount() {
    ImplementPlanDemo.configure({
      onExit: () => window.alert('Flow exited!'),
      onEnrolled: () => window.alert('Enrolled!')
    });
  }

  render() {
    return (
      <Page
        title="Embedded Implement Plan"
        fullScreen
      >
        { ImplementPlanDemo.render() }
      </Page>
    );
  }
}

export default EmbeddedImplementDemo;
