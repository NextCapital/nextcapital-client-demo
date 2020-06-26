/**
 * Copyright Notice
 * Copyright (c) 2020 NextCapital Group. All Rights Reserved.
 *
 * THIS IS UNPUBLISHED CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF NEXTCAPITAL GROUP.
 *
 * The copyright notice above does not evidence any actual or intended publication
 * of such source code.
 *
 * Copyright (c) 2020
 * NextCapital Group
 * All Rights Reserved.
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 * CONFIDENTIAL AND PROPRIETARY NOTICE
 * This source code is unpublished confidential and proprietary information constituting,
 * or derived under license from NextCapital Group's software.
 */

import _ from 'lodash';
import React from 'react';

import { ApiClient } from 'nextcapital-client';

import FakeConsole from '../FakeConsole';

import Page from '../components/Page';
import DemoConsole from '../components/DemoConsole';
import SimpleSpacer from '../components/SimpleSpacer';

class AccountApiDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: false,
      reload: false
    };

    this.console = new FakeConsole();
  }

  async makeApiCalls() {
    // read accounts with deferred properties
    this.console.log('reading accounts with deferred properties...');
    const accounts = await ApiClient.AccountModel.readAll({
      deferred: ['hasPendingTransactions', 'forecastTreatment'],
      reload: this.state.reload
    });

    this.console.log(`${accounts.length} accounts found! Details...`);
    _.forEach(accounts, (account) => (
      this.console.logObject({
        id: account.id,
        character: _.get(account.accountCharacter, 'key'),
        identifier: account.accountIdentifier,
        workplace: account.workplace,
        isManaged: account.isManaged,
        isRetailManaged: account.isRetailManaged,
        value: account.value,
        forecastTreatment: _.get(account.forecastTreatment, 'key'),
        hasPendingTransactions: account.hasPendingTransactions
      })
    ));

    // find any enrolled accounts (retail vs. workplace)
    const rmaAccounts = _.filter(accounts, { isManaged: true, isRetailManaged: true });
    const workplaceAccounts = _.filter(accounts, { isManaged: false, workplace: true });
    const enrolledWorkplaceAccounts = _.filter(accounts, { isManaged: true, workplace: true });
    const otherAccounts = _.filter(accounts, { isManaged: false, workplace: false });

    this.console.log(`Enrolled retail managed account count: ${rmaAccounts.length}`);
    this.console.log(`Unenrolled workplace account count: ${workplaceAccounts.length}`);
    this.console.log(`Enrolled workplace account count: ${enrolledWorkplaceAccounts.length}`);
    this.console.log(`Other account count: ${otherAccounts.length}`);

    // get value by sub account
    this.console.log('reading sub accounts...');
    await Promise.all(
      _.map(accounts, (account) => account.readSubAccounts({ reload: this.state.reload }))
    );

    _.map(accounts, (account) => {
      this.console.log(`account ${account.id} sub accounts:`);

      _.forEach(account.subAccounts, (subAccount) => (
        this.console.logObject({
          id: subAccount.id,
          subAccountCharacter: _.get(subAccount.subAccountCharacter, 'key'),
          contributionSource: _.get(subAccount.contributionSource, 'key'),
          value: subAccount.value
        })
      ));
    });

    // read all incomes
    this.console.log('reading incomes...');
    const incomes = await ApiClient.CashFlowModel.readIncomes({ reload: this.state.reload });

    this.console.log(`found ${incomes.length} incomes...`);
    // NOTE: Social Security behaves differently. This is not currently covered here.
    _.forEach(incomes, (income) => (
      this.console.logObject({
        id: income.id,
        type: _.get(income.type, 'key'),
        disabled: income.disabled,
        amount: income.amount,
        period: _.get(income.period, 'key'),
        startDate: _.invoke(income.timeFrame, 'startDate.format', 'MM-DD-YYYY'),
        endDate: _.invoke(income.timeFrame, 'endDate.format', 'MM-DD-YYYY'),
        basis: _.get(income.persistedBasis, 'key')
      })
    ));

    // read contributions for each account
    this.console.log('reading contributions...');
    await Promise.all(
      _.map(accounts, (account) => account.readContributions({ reload: this.state.reload }))
    );

    _.forEach(accounts, (account) => {
      this.console.log(`contributions for account ${account.id}:`);
      const contributions = account.getExistingAndMissingContributions();

      _.forEach(contributions, (contribution) => (
        this.console.logObject({
          isReal: contribution.isReal(),
          id: contribution.id,
          type: _.get(contribution.type, 'key'),
          taxTreatment: _.get(contribution.taxTreatment, 'key'),
          fromEmployer: contribution.fromEmployer(),
          amount: contribution.amount,
          basis: _.get(contribution.persistedBasis, 'key'),
          period: _.get(contribution.period, 'key'),
          canHaveAutoEscalation: contribution.canHaveAutoEscalation
        })
      ));
    });

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
      <Page title="Basic Account/Income/Contribution API">
        <SimpleSpacer>
          <p>This demo will read basic account, income, and contribution data over the API.</p>
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

export default AccountApiDemo;
