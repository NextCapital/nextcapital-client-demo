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

import React from 'react';

import {
  isCopyDebugging,
  toggleCopyDebugMode,
  getRegisteredCopy,
  getRegisteredCopyForKey,
  registerCopyForKey
} from 'nextcapital-client';

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
  constructor(props) {
    super(props);

    this.state = {
      registeredCopy: this.formatRegisteredCopy(),
      keyToEdit: '',
      newCopyForKey: ''
    };
  }

  formatRegisteredCopy() {
    return JSON.stringify(getRegisteredCopy(), null, 2);
  }

  toggleDebugger = () => {
    toggleCopyDebugMode();
    this.forceUpdate();
  };

  updateCopyForKey = () => {
    registerCopyForKey(this.state.keyToEdit, this.state.newCopyForKey);

    this.setState({
      keyToEdit: '',
      newCopyForKey: '',
      registeredCopy: this.formatRegisteredCopy(),
    });

    this.updateRegisteredCopy();
  };

  currentCopyForKey() {
    if (this.state.keyToEdit) {
      const currentCopy = getRegisteredCopyForKey(this.state.keyToEdit);

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
      getRegisteredCopyForKey(this.state.keyToEdit) !== null
    );
  }

  render() {
    return (
      <Page title="Copy Debugger">
        <SimpleSpacer>
          <h2>Toggle Copy Keys</h2>
          <div>All copy can be customized via the <i>copy.json</i> file. To make customizing copy easier, we a tool that allows displaying the copy keys in the embedded applications. Once toggled, return to any of the embedded demos.</div>
          <div>
            <span>This tool is currently: </span>
            <span>{ isCopyDebugging() ? 'Enabled' : 'Disabled' }</span>
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

export default CopyDebugger;
