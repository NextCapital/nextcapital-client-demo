import React from 'react';

import { getClient } from '@nextcapital/client';

import Page from '../components/Page';
import SolutionSpecificDemo from '../components/SolutionSpecificDemo';

class RICDemo extends React.Component {
  get RIC() {
    return getClient().RIC;
  }

  renderRICDemo() {
    return (
      <div>TODO</div>
    );
  }

  render() {
    return (
      <Page>
        <SolutionSpecificDemo
          module="RIC"
          getChildren={ () => this.renderRICDemo() }
        />
      </Page>
    )
  }
}

export default RICDemo;
