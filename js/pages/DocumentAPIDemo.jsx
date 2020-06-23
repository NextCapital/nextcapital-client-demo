import _ from 'lodash';
import React from 'react';

import { ApiClient } from 'nextcapital-client';

import FakeConsole from '../FakeConsole';

import Page from '../components/Page';
import DemoConsole from '../components/DemoConsole';
import SimpleSpacer from '../components/SimpleSpacer';

class DocumentApiDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: false,
      isDownloading: false,
      reload: false
    };

    this.console = new FakeConsole();
  }

  async makeApiCalls() {
    this.console.log('get existing documents + fetching custodian documents...');
    const documents = await ApiClient.FileModel.readAll({
      fetchLatest: true,
      reload: this.state.reload
    });

    if (documents.length) {
      this.console.log(`Found ${documents.length} documents! Info for the first (up to) 10:`);

      _.forEach(_.take(documents, 10), (document) => (
        this.console.logObject({
          id: document.id,
          kind: _.get(document.kind, 'key'),
          subkind: _.get(document.subkind, 'key'),
          name: document.name,
          accountId: _.get(document.account, 'id'),
          date: document.displayDate.format('MM-DD-YYYY')
        })
      ));

      this.console.log('getting data for first document...');
      const firstDocument = _.first(documents);

      const data = await firstDocument.readData();
      this.console.log(`Data read! It is a BLOB with ${data.size} bytes.`)
    } else {
      this.console.logError(`This user does not have any documents. Try again later.`);
      return;
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

  async getProposalPDF() {
    try {
      this.setState({ isDownloading: true });

      // Find the correct expense to get a proposal PDF for
      this.console.log('getting retirement...');
      const primaryPerson = await ApiClient.IndividualModel.readPrimaryPerson();
      await primaryPerson.readCashFlows();

      const retirementCashFlow = primaryPerson.retirementCashFlow;

      if (retirementCashFlow) {
        this.console.log(`getting proposal PDF for cash flow ${retirementCashFlow.id}... please wait...`);
      } else {
        this.console.logError('uh-oh: no retirement cash flow found...');
        this.setState({ isDownloading: false });
        return;
      }

      // Server runs forecasts and generates the PDF
      const proposal = await retirementCashFlow.getLatestProposal();

      // Then, we can download its data
      this.console.log('downloading proposal....');
      await proposal.download();

      this.console.log('done!');
    } catch (ex) {
      this.console.logError(ex.message);
    } finally {
      this.setState({ isDownloading: false });
    }
  }

  reset() {
    this.console.reset();
  }

  render() {
    return (
      <Page title="Document API">
        <SimpleSpacer>
          <p>This demo will get document info over the API.</p>
          <SimpleSpacer horizontal>
            <button
              onClick={ () => this.runDemo() }
              disabled={ this.state.isRunning }
            >
              { this.state.isRunning ? 'running...' : 'Run Demo' }
            </button>
            <button onClick={ () => this.reset() }>Reset Console</button>
            <button
              onClick={ () => this.getProposalPDF() }
              disabled={ this.state.isDownloading}
            >
              { this.state.isDownloading ? 'downloading...' : 'Get Proposal PDF' }
            </button>
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

export default DocumentApiDemo;
