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
  Redirect,
  withRouter
} from 'react-router-dom';

import { hasSession, authenticateSession } from 'nextcapital-client';

import Page from '../components/Page';
import SimpleSpacer from '../components/SimpleSpacer';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isFailed: false,
      username: '',
      password: '',
      jwt: ''
    };
  }

  performLogin = () => {
    this.setState({ isLoading: true })

    // This demo uses username/password or JWT for auth. We're still designing how auth would
    // work for a real client.
    const loginArgs = this.state.jwt ?
      { jwt: this.state.jwt } :
      { username: this.state.username, password: this.state.password };

    return authenticateSession(loginArgs).then(() => (
      this.props.history.push('/')
    )).catch(() => {
      this.setState({ isLoading: false, isFailed: true });
    });
  };

  render() {
    if (hasSession()) { // don't show login page if logged in!
      return (<Redirect to="/demos/" />);
    }

    return (
      <Page title="Login">
        <SimpleSpacer>
          <div>
            <span>username: </span>
            <input
              type="text"
              value={ this.state.username }
              onChange={ (e) => this.setState({ username: e.target.value, jwt: '' }) }
              placeholder="username"
            />
          </div>
          <div>
            <span>password: </span>
            <input
              type="password"
              value={ this.state.password }
              onChange={ (e) => this.setState({ password: e.target.value, jwt: '' }) }
              placeholder="password"
            />
          </div>
          <p>
            Alternatively, you can use a JWT to login:
          </p>
          <div>
            <textarea
              rows="3"
              cols="150"
              value={ this.state.jwt }
              onChange={ (e) => this.setState({ jwt: e.target.value, username: '', password: '' }) }
              placeholder="jwt"
            />
          </div>
          <button
            onClick={ this.performLogin }
            disabled={ this.state.isLoading || (!this.state.jwt && (!this.state.username || !this.state.password)) }
          >
            { this.state.isLoading ? 'logging in...' : 'Login' }
          </button>
          {
            this.state.isFailed && <span>That username or password is incorrect. Try agin.</span>
          }
        </SimpleSpacer>
      </Page>
    );
  }
}

export default withRouter(LoginPage);
