import React from 'react';

import { QuestionnaireDemo } from 'nextcapital-client';

import Page from '../components/Page';
import SimpleSpacer from '../components/SimpleSpacer';

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
      this.setState({ isFailed: true })
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
            { ' the questionnaire.'}
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
