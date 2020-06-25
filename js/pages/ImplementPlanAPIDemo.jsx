import _ from 'lodash';
import React from 'react';

import { ApiClient } from 'nextcapital-client';

import FakeConsole from '../FakeConsole';

import Page from '../components/Page';
import DemoConsole from '../components/DemoConsole';
import SimpleSpacer from '../components/SimpleSpacer';

/**
 * This demo shows how to get the current status of a plan implementation and start a new one. It
 * does not demonstrate the APIs related to envelopes. You can view those in the `network` tab of
 * development tools while using the embedded UI demos.
 *
 * This API is complex and also likely subject to change in the future. As such, it is also a good
 * candidate for becoming a "bundled" API. This way, we could provide a consistent and simplified
 * schema to external consumers.
 */
class ImplementPlanApiDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: false,
      reload: false
    };

    this.console = new FakeConsole();
  }

  async processWorkflow(workflow) {
    if (workflow.isErrored) {
      this.console.log('the workflow is errored. expect NextCapital to repair it.');
    } else {
      this.console.log('the workflow is in-progress... checking for envelope...');

      // envelope is handled by a child workflow
      const envelopeWorkflow = workflow.findChildWorkflow(
        ApiClient.WorkflowModel.TYPES.IMPLEMENT_ENVELOPE_ACTIONS
      );

      const envelopeId = _.get(envelopeWorkflow, 'metadata.envelopeId');

      if (envelopeId) {
        this.console.log('reading envelope...');

        // The `depth: 0` here marks the model as incomplete/loadable if need be.
        // We intend to make it easier to load a single model like this in the future.
        const envelope = new ApiClient.EnvelopeModel({ id: envelopeId }, { depth: 0 });
        await envelope.read({ reload: this.state.reload });

        if (envelope.isActive()) { // needs some user interaction
          this.console.log('envelope needs user interaction. switch to the embedded implement plan demo!');
        } else { // envelope is signed and complete
          this.console.log('envelope is completed... workflow should complete within a few days.');
        }
      } else {
        this.console.log('this workflow does not need an envelope');
      }
    }
  }

  async makeApiCalls() {
    this.console.log('first, check for an existing one...');

    // Find the retirement cash flow
    const primaryPerson = await ApiClient.IndividualModel.readPrimaryPerson();
    await primaryPerson.readCashFlows();
    const retirementCashFlow = primaryPerson.retirementCashFlow;
    const currentForecastExpense = await retirementCashFlow.readCurrentForecastExpense();

    // Find any existing implement plan workflow. We count errored ones as active.
    await ApiClient.WorkflowModel.readAll({ reload: this.state.reload });
    const workflow = ApiClient.WorkflowModel.findActiveOrErroredWorkflow(
      ApiClient.WorkflowModel.TYPES.IMPLEMENT_PLAN,
      (workflow) => _.get(workflow.metadata, 'request.expenseId') === retirementCashFlow.id
    );

    // If the workflow exist, handle it. Otherwise, create a new one.
    if (workflow) {
      this.console.log(`found active workflow ${workflow.id}`);
      await this.processWorkflow(workflow);
    } else {
      this.console.log('no workflow is active... we will need to start a new one...');

      const createdWorkflow = await ApiClient.WorkflowModel.startWorkflow(
        ApiClient.WorkflowModel.TYPES.IMPLEMENT_PLAN,
        {
          request: { // params for the workflow
            expense_id: retirementCashFlow.id
          },
          runInline: true // run in the controller vs. async
        }
      );

      // Need to poll until the workflow reaches the appropriate step
      this.console.log('workflow created... polling...');
      await createdWorkflow.poll({
        depth: 2,
        finishPolling: async () => {
          const envelopeWorkflow = createdWorkflow.findChildWorkflow(
            ApiClient.WorkflowModel.TYPES.IMPLEMENT_ENVELOPE_ACTIONS
          );

          // If we have an envelope, finish polling and redirect to envelope code
          if (_.get(envelopeWorkflow, 'metadata.envelopeId')) {
            this.console.log('envelope ID found... exiting polling...');
            return true;
          }

          // Otherwise, stop polling as soon as the advice expense is implemented
          await currentForecastExpense.read({ reload: true });
          if (currentForecastExpense.implemented) {
            this.console.log('implemented... exiting polling...');
            return true;
          };

          this.console.log('not yet implemented... trying again...');
          return false;
        }
      });

      // Handle the newly-created workflow
      await this.processWorkflow(createdWorkflow);
    }

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
      <Page title="Implement Plan API">
        <SimpleSpacer>
          <p>This demo will explore both starting and getting the status of an implement plan workflow over the API.</p>
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

export default ImplementPlanApiDemo;
