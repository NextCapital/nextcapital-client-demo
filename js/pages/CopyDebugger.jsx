import React from 'react';

import { isCopyDebugging, toggleCopyDebugMode } from 'nextcapital-client';

import Page from '../components/Page';
import SimpleSpacer from '../components/SimpleSpacer';

class CopyDebugger extends React.Component {
  toggle = () => {
    toggleCopyDebugMode();
    this.forceUpdate();
  };

  render() {
    return (
      <Page title="Copy Debugger">
        <SimpleSpacer>
          <div>All copy can be customized via the <i>copy.json</i> file. To make customizing copy easier, we a tool that allows displaying the copy keys in the embedded applications.</div>
          <div>
            <span>This tool is currently: </span>
            <span>{ isCopyDebugging() ? 'Enabled' : 'Disabled' }</span>
          </div>
          <button onClick={ this.toggle }>Toggle Enabled</button>
          <div>Once toggled, return to any of the embedded demos.</div>
          <div>Over time, NextCapital intends to significantly expand these tools, to hopefully enable full self-service copy.</div>
        </SimpleSpacer>
      </Page>
    );
  }
}

export default CopyDebugger;
