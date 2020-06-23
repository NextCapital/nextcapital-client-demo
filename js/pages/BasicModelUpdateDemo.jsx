import _ from 'lodash';
import React from 'react';

import { ApiClient } from 'nextcapital-client';

import FakeConsole from '../FakeConsole';

import Page from '../components/Page';
import DemoConsole from '../components/DemoConsole';
import SimpleSpacer from '../components/SimpleSpacer';

class BasicModelUpdateDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: false,
      firstName: '',
      salary: ''
    };

    this.console = new FakeConsole();
  }

  async makeApiCalls() {
    // do some quick checks of the new salary amount
    const newSalary = _.toNumber(this.state.salary);
    if (_.isNaN(newSalary) || newSalary < 0) {
      this.console.logError('salary is not a positive number');
      return;
    }

    // Get an log the current model info
    this.console.log('getting current values...');
    const primaryPerson = await ApiClient.IndividualModel.readPrimaryPerson();

    await primaryPerson.readCashFlows();
    const salary = primaryPerson.salaryCashFlow;

    this.console.log(`current first name: ${primaryPerson.firstName}`);
    this.console.log(`current salary: ${salary.amount}`);

    // Update the first name if need be. We can't update the real model, so we need to
    // clone it first. We can then update and save the clone. Once saved, the changes will
    // persist to the `real` model.
    const personClone = primaryPerson.createClone();
    personClone.firstName = this.state.firstName;

    if (personClone.isDirty()) { // Clones support dirty checking!
      this.console.log(`Updating first name to ${personClone.firstName}...`);
      await personClone.save();

      if (personClone.firstName === primaryPerson.firstName) {
        this.console.log('First name updated!');
      } else {
        this.console.logError('First name did not persist! This should not happen!');
      }
    } else {
      this.console.log(`First name was not modified! Skipping update...`);
    }

    // Update the salary if need be. We need to clone here as well.
    const salaryClone = salary.createClone();
    salaryClone.amount = newSalary;

    if (salaryClone.isDirty()) { // Clones support dirty checking!
      this.console.log(`Updating salary amount to ${salaryClone.amount}...`);
      await salaryClone.save();

      if (salaryClone.amount === salary.amount) {
        this.console.log('Salary amount updated!');
      } else {
        this.console.logError('Salary amount did not persist! This should not happen!');
      }
    } else {
      this.console.log(`Salary amount was not modified! Skipping update...`);
    }

    this.console.log('done!');
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
      <Page title="Basic Model Updates">
        <SimpleSpacer>
          <p>This demo show how to make basic model updates over the API. Any updates should be reflected in the embedded Uis.</p>
          <SimpleSpacer horizontal>
            <button
              onClick={ () => this.runDemo() }
              disabled={ this.state.isRunning || !this.state.firstName || !this.state.salary }
            >
              { this.state.isRunning ? 'running...' : 'Run Demo' }
            </button>
            <button onClick={ () => this.reset() }>Reset Console</button>
            <div>
              <span>new first name: </span>
              <input
                type="text"
                value={ this.state.firstName }
                onChange={ (e) => this.setState({ firstName: e.target.value }) }
                placeholder="enter first name"
              />
            </div>
            <div>
              <span>new salary: </span>
              <input
                type="text"
                value={ this.state.salary }
                onChange={ (e) => this.setState({ salary: e.target.value }) }
                placeholder="enter salary"
              />
            </div>
          </SimpleSpacer>
          <DemoConsole console={ this.console } />
        </SimpleSpacer>
      </Page>
    );
  }
}

export default BasicModelUpdateDemo;
