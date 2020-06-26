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

import _ from 'lodash';
import React from 'react';

import { ApiClient } from 'nextcapital-client';

import FakeConsole from '../FakeConsole';

import Page from '../components/Page';
import DemoConsole from '../components/DemoConsole';
import SimpleSpacer from '../components/SimpleSpacer';

class ProfileApiDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: false,
      reload: false
    };

    this.console = new FakeConsole();
  }

  async makeApiCalls() {
    this.console.log('reading primary person....');

    // this method currently doesn't yet support reload natively
    const primaryPerson = await ApiClient.IndividualModel.readPrimaryPerson();

    if (this.state.reload) {
      this.console.log('reloading primary person...');
      await primaryPerson.read({ reload: true });
    }

    this.console.log('primary person read!');
    this.console.logObject({
      firstName: primaryPerson.firstName,
      middleName: primaryPerson.middleName,
      lastName: primaryPerson.lastName,
      sex: primaryPerson.sex.key,
      birthDate: _.invoke(primaryPerson.birthDate, 'format', 'MM-DD-YYYY'),
      maritalStatus: primaryPerson.maritalStatus.key
    });

    // spouse info
    if (primaryPerson.isMarried()) {
      this.console.log('reading spouse....');
      primaryPerson.spouse.read({ reload: this.state.reload });

      this.console.log('spouse info: ');
      this.console.logObject({
        firstName: primaryPerson.spouse.firstName,
        middleName: primaryPerson.spouse.middleName,
        lastName: primaryPerson.spouse.lastName,
        sex: primaryPerson.spouse.sex.key,
        birthDate: _.invoke(primaryPerson.spouse.birthDate, 'format', 'MM-DD-YYYY')
      });
    } else {
      this.console.log('person is not married');
    }

    // load the contacts, then extract interesting values
    this.console.log('loading contacts....');
    await primaryPerson.readContacts({ reload: this.state.reload });

    const email = primaryPerson.primaryEmail ? primaryPerson.primaryEmail.value : 'n/a';
    this.console.log(`Email: ${email}`);

    if (primaryPerson.primaryPhoneNumber) {
      this.console.log(`Primary phone: ${primaryPerson.primaryPhoneNumber.value} (${primaryPerson.primaryPhoneNumber.subType.key})`)
    } else {
      this.console.log('no primary phone number exists');
    }

    // load and output address info
    this.console.log('loading addresses...');
    await primaryPerson.readAddresses({ reload: this.state.reload });
    const primaryAddress = primaryPerson.primaryAddress;

    if (primaryAddress) {
      const formattedPrimaryAddress = (
        `${primaryAddress.line1}, ${primaryAddress.city} ${primaryAddress.region}, ${primaryAddress.fullPostalCode}`
      );
      this.console.log(`primary address: ${formattedPrimaryAddress}`);

      const mailingAddress = primaryPerson.mailingAddress;
      if (mailingAddress === primaryAddress) {
        this.console.log('primary address is also the mailing address');
      } else {
        const formattedMailingAddress = (
          `${mailingAddress.line1}, ${mailingAddress.city} ${mailingAddress.region}, ${mailingAddress.fullPostalCode}`
        );
        this.console.log(`mailing address: ${formattedMailingAddress}`);
      }
    } else {
      this.console.log('this user has no primary address');
    }

    // salary and retirement info
    this.console.log('reading salary and retirement info....');
    await primaryPerson.readCashFlows({ reload: this.state.reload });

    const salary = primaryPerson.salaryCashFlow;
    if (salary) {
      this.console.log(`salary: ${salary.amount}`)
    } else {
      this.console.log('no salary found');
    }

    const retirement = primaryPerson.retirementCashFlow;
    if (retirement) {
      this.console.log(
        `retirement start date: ${_.invoke(retirement.timeFrame, 'startDate.format', 'MM-DD-YYYY')}`
      );
    } else {
      this.console.logError('retirement not found... that is odd...');
    }

    // Get profile questionnaire and its answers. Questionnaire/question models are shared, but
    // answers are specific to a given person, so they are accessed via the person model.
    this.console.log('reading profile questionnaire...');
    await primaryPerson.readQuestionnaires();

    const profileQuestionnaire = _.find(
      primaryPerson.questionnaires,
      { systemId: ApiClient.QuestionnaireModel.SYSTEM_IDS.PROFILE }
    );

    this.console.log('questionnaires loaded, reading answers...');
    if (profileQuestionnaire) {
      const promises = _.map(profileQuestionnaire.questions, async (question) => {
        const answer = await primaryPerson.readQuestionAnswer({
          questionnaire: profileQuestionnaire,
          question,
          reload: this.state.reload
        });

        if (answer) {
          // corresponds to either a choice ID or numeric value
          this.console.log(`question: ${question.systemId} is has answer ${answer.value}`);
        } else {
          this.console.log(`question: ${question.systemId} is not yet answered`);
        }
      });

      await Promise.all(promises);
      this.console.log('done!');
    } else {
      this.console.logError('profile questionnaire not found... that is odd...');
    }
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
      <Page title="Basic Profile API">
        <SimpleSpacer>
          <p>This demo will read basic profile data (name, address, contacts, questions, etc...) over the API.</p>
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

export default ProfileApiDemo;
