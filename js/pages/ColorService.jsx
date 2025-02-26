import _ from 'lodash';
import React from 'react';

import { getClient } from '@nextcapital/client';

import Page from '../components/Page';
import SimpleSpacer from '../components/SimpleSpacer';
import Swatch from '../components/Swatch';

class ColorService extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    overrides: new Map()
  };

  updateColors = () => {
    const { ColorService: ClientColorService } = getClient();

    this.state.overrides.forEach((value, key) => {
      ClientColorService.setColor(key, value);
    });

    this.setState({ overrides: new Map() });
  };

  resetColors = () => {
    this.setState({ overrides: new Map() });
  };

  setColor = (color, value) => {
    this.state.overrides.set(color, value);
    this.setState({});
  };

  renderSwatches() {
    const { ColorService: ClientColorService } = getClient();

    return _.map(_.values(ClientColorService.COLORS), (colorName) => (
      <Swatch
        key={ colorName }
        name={ colorName }
        value={ this.state.overrides.get(colorName) || ClientColorService.getColor(colorName) }
        onChange={ this.setColor }
      />
    ));
  }

  /* eslint-disable @stylistic/max-len */
  render() {
    return (
      <Page>
        <SimpleSpacer>
          <div>The ColorService allows dynamically getting and setting colors at runtime. Below, you can view and edit all the colors that ColorService provides.</div>
          <div>NOTE: This view does not handle colors with transparencies very well. They will produce many console warnings.</div>
          <SimpleSpacer horizontal>
            <button
              type="button"
              onClick={ this.updateColors }
              disabled={ this.state.overrides.size === 0 }
            >
              Update Colors
            </button>
            <button
              type="button"
              onClick={ this.resetColors }
              disabled={ this.state.overrides.size === 0 }
            >
              Reset Local Changes
            </button>
          </SimpleSpacer>
          <div>
            {
              this.renderSwatches()
            }
          </div>
        </SimpleSpacer>
      </Page>
    );
  }
  /* eslint-enable @stylistic/max-len */
}

export default ColorService;
