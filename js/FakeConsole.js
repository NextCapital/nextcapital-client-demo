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

/**
 * The model for the DemoConsole component. This is a simple console that allows logging
 * messages.
 */
class FakeConsole {
  constructor() {
    this._messages = [];
    this._listeners = [];
  }

  _callListeners() {
    _.forEach(this._listeners, (listener) => { listener(); });
  }

  _pushMessage(message) {
    this._messages.push(message);
    this._callListeners();
  }

  getMessages() {
    return this._messages;
  }

  addListener(func) {
    this._listeners.push(func);
  }

  removeListener(func) {
    _.pull(this._listeners, func);
  }

  reset() {
    this._messages = [];
    this._callListeners();
  }

  logDivider() {
    this.logEmptyLine();
    this.log('------------------------------------------------');
    this.logEmptyLine();
  }

  logEmptyLine() {
    this.log(' ');
  }

  logObject(object) {
    this.log(JSON.stringify(object));
  }

  log(text) {
    this._pushMessage({ text, isError: false });
  }

  logError(text) {
    this._pushMessage({ text, isError: true });
  }
}

export default FakeConsole;
