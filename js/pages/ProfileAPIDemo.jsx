import React from 'react';

import { ApiClient } from 'nextcapital-client';

import FakeConsole from '../FakeConsole';

import Page from '../components/Page';
import DemoConsole from '../components/DemoConsole';
import SimpleSpacer from '../components/SimpleSpacer';

class ProfileApiDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: false,
      reload: false
    };

    this.console = new FakeConsole();
  }

  async makeApiCalls() {
    this.console.log('reading primary person....');

    // this method currently doesn't yet support reload natively
    const primaryPerson = await ApiClient.IndividualModel.readPrimaryPerson();

    if (this.state.reload) {
      this.console.log('reloading primary person...');
      await primaryPerson.read({ reload: true });
    }

    this.console.log('primary person read!');
    this.console.logObject({
      firstName: primaryPerson.firstName,
      middleName: primaryPerson.middleName,
      lastName: primaryPerson.lastName,
      sex: primaryPerson.sex.key
    });
  }

  runDemo() {
    this.setState({ isRunning: true });
    this.makeApiCalls().catch((e) => {
      this.console.logError(e.message);
      console.error(e);
    }).finally(() => {
      this.console.logDivider();
      this.setState({ isRunning: false });
    });
  }

  reset() {
    this.console.reset();
  }

  render() {
    return (
      <Page title="Basic Profile API">
        <SimpleSpacer>
          <p>This demo will read basic profile data (name, address, contacts, questions, etc...) over the API.</p>
          <SimpleSpacer horizontal>
            <button
              onClick={ () => this.runDemo() }
              disabled={ this.state.isRunning }
            >
              { this.state.isRunning ? 'running...' : 'Run Demo' }
            </button>
            <button onClick={ () => this.reset() }>Reset Console</button>
            <span>reload models:</span>
            <input
              type="checkbox"
              checked={ this.state.reload }
              onChange={ (e) => this.setState({ reload: e.target.checked }) }
            />
          </SimpleSpacer>
          <DemoConsole console={ this.console } />
        </SimpleSpacer>
      </Page>
    );
  }
}

export default ProfileApiDemo;
