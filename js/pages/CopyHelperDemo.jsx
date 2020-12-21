import React from 'react';

import { getClient } from '@nextcapital/client';

import Page from '../components/Page';
import SimpleSpacer from '../components/SimpleSpacer';

/**
 * Our in-house UI framework has a single method to get UI copy. This means we can easily
 * build a debug tool that shows that copy key being requested in each place that copy is used
 * in the UI.
 *
 * For example, after enabling, you may see `example.deep.title` in the UI. You can then add
 * an override for that copy key using this tool. In general the process goes:
 *
 * 1) Use the debugger to find the key
 * 2) Update the copy for that key using the tool
 * 3) Check if the results in the UI are as expected. If not, NextCapital may need to make some
 *    updates to allow that copy to be more easily or specifically configured.
 *
 * We hope to expend these debug tools and generally make customizing copy easier in the future.
 *
 * NOTE: We recommend using this only as a helper tool for building copy configs. NextCapital
 * should be managing all actual copy in the application. Any copy registered via this tool can
 * break without notice. See provided documentation.
 */
class CopyHelperDemo extends React.Component {
  state = {
    registeredCopy: this.formatRegisteredCopy(),
    keyToEdit: '',
    newCopyForKey: ''
  };

  get copyHelper() {
    return getClient().CopyHelper;
  }

  formatRegisteredCopy() {
    return JSON.stringify(this.copyHelper.getRegisteredCopy(), null, 2);
  }

  toggleDebugger = () => {
    if (this.copyHelper.isCopyDebugging()) {
      this.copyHelper.disableCopyDebugMode();
    } else {
      this.copyHelper.enableCopyDebugMode();
    }

    this.forceUpdate();
  };

  updateCopyForKey = () => {
    this.copyHelper.registerCopyForKey(this.state.keyToEdit, this.state.newCopyForKey);

    this.setState({
      keyToEdit: '',
      newCopyForKey: '',
      registeredCopy: this.formatRegisteredCopy(),
    });

    this.updateRegisteredCopy();
  };

  currentCopyForKey() {
    if (this.state.keyToEdit) {
      const currentCopy = this.copyHelper.getRegisteredCopyForKey(this.state.keyToEdit);

      if (currentCopy !== null) {
        return currentCopy;
      }

      return 'no copy at that key';
    }

    return 'no key entered';
  }

  canUpdate() {
    return (
      this.state.keyToEdit &&
      this.state.newCopyForKey &&
      this.copyHelper.getRegisteredCopyForKey(this.state.keyToEdit) !== null
    );
  }

  render() {
    return (
      <Page>
        <SimpleSpacer>
          <h2>Toggle Copy Keys</h2>
          <div>To make configuring copy easier, we provide a tool that allows displaying the copy keys in the embedded applications. Once toggled, return to any of the embedded demos.</div>
          <div>
            <span>This tool is currently: </span>
            <span>{ this.copyHelper.isCopyDebugging() ? 'Enabled' : 'Disabled' }</span>
          </div>
          <button onClick={ this.toggleDebugger }>Toggle Enabled</button>
          <h2>View Existing Copy</h2>
          <div>Tools also allow viewing all configured copy for the application.</div>
          <textarea
            rows={ 30 }
            cols={ 100 }
            placeholder="click the button to view copy"
            value={ this.state.registeredCopy }
            readOnly
          />
          <h2>Live Edit Copy</h2>
          <div>It is possible to modify copy on the fly. First enter a copy key:</div>
          <input
            type="text"
            placeholder="enter copy key"
            value={ this.state.keyToEdit }
            onChange={ (e) => this.setState({ keyToEdit: e.target.value }) }
          />
          <div>Current copy for this key (feel free to copy/paste):</div>
          <textarea
            rows={ 4 }
            cols={ 100 }
            value={ this.currentCopyForKey() }
            readOnly
          />
          <div>New copy for this key:</div>
          <textarea
            rows={ 4 }
            cols={ 100 }
            value={ this.state.newCopyForKey }
            placeholder="enter new copy for key"
            onChange={ (e) => this.setState({ newCopyForKey: e.target.value }) }
          />
          <button
            onClick={ this.updateCopyForKey }
            disabled={ !this.canUpdate() }
          >
            Update Copy
          </button>
          <div>Updated copy will appear in the demos. Note that if the new copy is invalid, nothing will show up in the UI for the key.</div>
        </SimpleSpacer>
      </Page>
    );
  }
}

export default CopyHelperDemo;
