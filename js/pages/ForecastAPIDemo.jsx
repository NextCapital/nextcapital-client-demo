import _ from 'lodash';
import React from 'react';

import { ApiClient } from 'nextcapital-client';

import FakeConsole from '../FakeConsole';

import Page from '../components/Page';
import DemoConsole from '../components/DemoConsole';
import SimpleSpacer from '../components/SimpleSpacer';

/**
 * This demo shows how to make a forecast, and get information from both the forecast results
 * and the advice models the forecast generates.
 *
 * Notably, this uses the `LegacyForecast` API. This API provides forecast results in the same
 * format as the `Plan` section uses for the `nextcapital.com` UI. Eventually, we don't know
 * quite when yet, we intend to replace this with an updated v2 forecast stack.
 *
 * This v2 forecast stack would be, among other things, significantly faster. This anticipated
 * thrash makes the forecast APIs a good candidate for "bundling" for external use: this way, we
 * can more easily maintain a more consistent schema even while changing the underlying forecast
 * code.
 */
class ForecastApiDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: false,
      reload: false
    };

    this.console = new FakeConsole();
  }

  async makeApiCalls() {
    // Find the retirement cash flow to make the forecast for
    this.console.log('finding retirement expense....');

    const primaryPerson = await ApiClient.IndividualModel.readPrimaryPerson();
    await primaryPerson.readCashFlows();

    const retirementCashFlow = primaryPerson.retirementCashFlow;
    if (retirementCashFlow) {
      this.console.log(`forecasting for retirement cash flow ${retirementCashFlow.id}`);
    } else {
      this.console.logError('uh-oh: no retirement cash flow found...');
      return;
    }

    // Get the status of the forecast model
    if (retirementCashFlow.latestLegacyForecast) {
      if (retirementCashFlow.isLegacyForecastInvalidated) {
        this.console.log('forecast was invalided and needs to re-run');
      } else {
        this.console.log('forecast has run and is up-to-date');
      }
    } else {
      this.console.log('forecast has never been requested');
    }

    // Get the forecast
    this.console.log('getting a forecast... please wait...');
    const forecast = await retirementCashFlow.getLegacyForecast({ reload: this.state.reload });

    // Print out various forecast values
    this.console.log(`user forecast age: ${forecast.userForecastAge}`);
    this.console.log(`retirement age: ${forecast.retirementAge}`);
    this.console.log(`current equity percent: ${forecast.currentEquityPercent}`);
    this.console.log(`retirement equity percent: ${forecast.retirementEquityPercent}`);
    this.console.log(`total employee contributions: ${forecast.totalContributions}`);
    this.console.log(`current wealth: ${forecast.currentWealth}`);
    this.console.log(`forecast wealth at retirement: ${forecast.wealthAtRetirement}`);
    this.console.log(`sustainable income: ${forecast.incomeAtRetirement}`);
    this.console.log(`target spending: ${forecast.targetSpending}`);

    // Find the advice expense
    this.console.log('getting forecast advice expense....'); // technically, already loaded
    const forecastAdviceExpense = await retirementCashFlow.readCurrentForecastExpense();

    // Get info from the advice expense on account action groups
    this.console.log('forecast expense found, reading active action groups...');
    await forecastAdviceExpense.readActionGroups();

    _.forEach(forecastAdviceExpense.activeActionGroups, (group) => (
      this.console.logObject({
        id: group.id,
        isPartial: group.isPartial,
        isDistributionBased: group.isDistributionBased,
        sourceAccountId: _.get(group.sourceAccount, 'id'),
        subAccountCharacter: _.get(group.subAccountCharacter, 'key'),
        actionType: _.get(group.actionType, 'key'),
        actionMethod: _.get(group.actionMethod, 'key'),
        isRetail: group.isRetail,
        isAssumedFullDistribution: group.isAssumedFullDistribution,
        hasDistribution: group.hasDistribution,
        balanceToMove: group.balanceToMove,
        distributionAmount: group.distributionAmount
      })
    ));

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
      <Page title="Forecast API">
        <SimpleSpacer>
          <p>This demo will run a forecast over the API.</p>
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

export default ForecastApiDemo;
