import _ from 'lodash';

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
