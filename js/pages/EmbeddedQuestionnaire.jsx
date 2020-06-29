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

import { QuestionnaireDemo } from 'nextcapital-client';

import Page from '../components/Page';
import SimpleSpacer from '../components/SimpleSpacer';

/**
 * This demo attempts to show two-way communication between an Embedded UI and the UI that is
 * embedding in.
 *
 * As we can see, this requires a bit more work than embedding an entire application. We need no
 * make sure the outer app re-renders whenever a change occurs and the outer application needs to
 * handle significantly more logic.
 */
class EmbeddedQuestionnaire extends React.Component {
  constructor(props) {
    super(props);

    this._render = () => this.setState({});

    this.state = {
      isSaving: false,
      isFailed: false
    };
  }

  componentDidMount() {
    QuestionnaireDemo.registerOnUpdate(this._render);
  }

  componentWillUnmount() {
    QuestionnaireDemo.deregisterOnUpdate(this._render);
  }

  save = () => {
    this.setState({ isSaving: true, isFailed: false });

    QuestionnaireDemo.save().then(() => (
      this.setState({ isSaving: false })
    )).catch(() => (
      this.setState({ isSaving: false, isFailed: true })
    ));
  };

  render() {
    return (
      <Page title="Embedded Implement Plan">
        <SimpleSpacer>
          <p>This demo shows two-way communication between the embedded content and its parent.</p>
          <p>Only the set of questions is provided by the NextCapital Client. All other UI is provided by the consuming application.</p>
          { QuestionnaireDemo.render() }
          <div>
            { 'You can ' }
            <button
              onClick={ this.save }
              disabled={ this.state.isSaving || !QuestionnaireDemo.canSave() }
            >
              { this.state.isSaving ? 'saving...' : 'Save' }
            </button>
            { ' or '}
            <button
              onClick={ QuestionnaireDemo.reset }
              disabled={ this.state.isSaving || !QuestionnaireDemo.needsToSave() }
            >
              Reset
            </button>
            { ' the questionnaire. These buttons are not provided by the embedded UI.'}
          </div>
          {
            this.state.isFailed && <p>Uh-oh, something went wrong.</p>
          }
        </SimpleSpacer>
      </Page>
    );
  }
}

export default EmbeddedQuestionnaire;
