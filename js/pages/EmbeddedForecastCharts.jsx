import _ from 'lodash';
import React from 'react';

import { ForecastChartDemo } from 'nextcapital-client';

import Page from '../components/Page';
import SimpleSpacer from '../components/SimpleSpacer';
import SimpleCard from '../components/SimpleCard';

/**
 * This demo simulates how we would embed our React content in a non-react Application.
 *
 * Since our demo app is built in React, we use React Refs to simulate rendering in an
 * arbitrary DOM node.
 */
class EmbeddedForecastCharts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tier: ForecastChartDemo.TIERS.BASIC
    };

    this.assetClassPieRef = React.createRef();
    this.assetClassAreaRef = React.createRef();
    this.wealthOverTimeRef = React.createRef();
    this.projectedIncomeRef = React.createRef();
  }

  componentDidMount() {
    this.renderCharts();
  }

  componentDidUpdate() {
    this.renderCharts();
  }

  /**
   * Renders each chart in its appropriate React ref. The charts should automatically
   * update from now on. We will need to re-render manually if something like the `tier`
   * changes.
   *
   * Each chart requires a single line of code to render.
   */
  renderCharts() {
    if (this.assetClassPieRef.current) {
      ForecastChartDemo.renderAssetClass(
        this.assetClassPieRef.current,
        this.state.tier
      );
    }

    if (this.assetClassAreaRef.current) {
      ForecastChartDemo.renderAssetClassOverTime(
        this.assetClassAreaRef.current,
        this.state.tier
      );
    }

    if (this.wealthOverTimeRef.current) {
      ForecastChartDemo.renderWealthOverTime(this.wealthOverTimeRef.current);
    }

    if (this.projectedIncomeRef.current) {
      ForecastChartDemo.renderProjectedIncome(this.projectedIncomeRef.current);
    }
  }

  renderMainCard() {
    return (
      <SimpleCard title="About This Demo">
        <SimpleSpacer>
          <p>This demo attempts to show two things:</p>
          <div>
            <div>1: Embedding NextCapital-provided React UI into a non-React application</div>
            <div>2: Embedding content like a chart into an arbitrary UI</div>
          </div>
          <p>Notably, if the forecast inputs are changed via some other demo, these charts should update automatically!</p>
          <p>The asset class charts allow different tiers:</p>
          <select
            value={ this.state.tier }
            onChange={ (e) => this.setState({ tier: e.target.value }) }
          >
            {
              _.map(ForecastChartDemo.TIERS, (tier) => (
                <option key={ tier } value={ tier }>{ tier }</option>
              ))
            }
          </select>
        </SimpleSpacer>
      </SimpleCard>
    );
  }

  /**
   * Notably, we render an empty div with a ref for the chart to render in.
   */
  renderChartCard(title, ref) {
    return (
      <SimpleCard title={ title }>
        <div ref={ ref }></div>
      </SimpleCard>
    );
  }

  render() {
    return (
      <Page
        title="Embedded Forecast Charts"
        className="forecast-chart-demo"
      >
        { this.renderMainCard() }
        { this.renderChartCard('Assets Pie Chart', this.assetClassPieRef) }
        { this.renderChartCard('Assets Over Time', this.assetClassAreaRef) }
        { this.renderChartCard('Projected Wealth Over Time', this.wealthOverTimeRef) }
        { this.renderChartCard('Projected Income', this.projectedIncomeRef ) }
      </Page>
    );
  }
}

export default EmbeddedForecastCharts;
