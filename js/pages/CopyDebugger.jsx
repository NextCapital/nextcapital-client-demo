import React from 'react';

import { isCopyDebugging, toggleCopyDebugMode } from 'nextcapital-client';

import Page from '../components/Page';
import SimpleSpacer from '../components/SimpleSpacer';

/**
 * Our in-house UI framework has a single method to get UI copy. This means we can easily
 * build a debug tool that shows that copy key being requested in each place that copy is used
 * in the UI.
 *
 * For example, after enabling, you may see `example.deep.title` in the UI. You can then add
 * an override in `copy.json` for that copy key:
 *
 * {
 *   "example": {
 *     "deep": {
 *        "title": "This is copy for ${tenant.name}!"
 *     }
 *   }
 * }
 *
 * This will then render `This is copy for External API Demo!` in the UI.
 *
 * Copy supports substitutions, formatting, conditional copy, etc... all you would need to do
 * get custom copy in any embedded UI is:
 *
 * 1) Use the debugger to find the key
 * 2) Update the copy at that key in `copy.json`
 * 3) Check if the results in the UI are as expected. If not, NextCapital may need to make some
 *    updates to allow that copy to be more easily or specifically configured.
 *
 * We hope to expend these debug tools and generally make customizing copy easier in the future.
 */
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
