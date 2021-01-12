import React from 'react';

import { getClient } from '@nextcapital/client';

import Page from '../components/Page';
import SolutionSpecificDemo from '../components/SolutionSpecificDemo';
import SimpleSpacer from '../components/SimpleSpacer';

/**
 * Demo for the Retirement Income Calculator (RIC) API.
 */
class RICDemo extends React.Component {
  state = {
    loading: false
  };

  /**
   * Returns the RIC module from the remote client.
   */
  get RIC() {
    return getClient().RIC;
  }

  /**
   * Displays the API response (if present) or a message saying it has not yet loaded.
   */
  getDisplayValue() {
    if (this.RIC.hasLoaded()) {
      const data = this.RIC.getLatest();
      return JSON.stringify(data, null, 2);
    }

    return 'not yet loaded. click the button to load data.';
  }

  /**
   * Loads the data, reloading if specified.
   *
   * @param {boolean} reload
   */
  async loadData(reload = false) {
    this.setState({ loading: true });
    await this.RIC.readLatest({ reload });
    this.setState({ loading: false });
  }

  renderRICDemo() {
    return (
      <SimpleSpacer>
        <textarea
          rows="24"
          cols="80"
          value={ this.getDisplayValue() }
          readOnly
        />
        <SimpleSpacer horizontal>
          <button
            onClick={ () => this.loadData() }
            disabled={ this.state.loading }
          >
            Load
          </button>
          <button
            onClick={ () => this.loadData(true) }
            disabled={ this.state.loading }
          >
            Reload
          </button>
        </SimpleSpacer>
      </SimpleSpacer>
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
    );
  }
}

export default RICDemo;
