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
      password: ''
    };
  }

  performLogin = () => {
    this.setState({ isLoading: true })

    // This demo uses username/password for auth. A real product would... not.
    return authenticateSession({
      username: this.state.username,
      password: this.state.password
    }).then(() => (
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
              onChange={ (e) => this.setState({ username: e.target.value }) }
              placeholder="username"
            />
          </div>
          <div>
            <span>password: </span>
            <input
              type="password"
              value={ this.state.password }
              onChange={ (e) => this.setState({ password: e.target.value }) }
              placeholder="password"
            />
          </div>
          <button
            onClick={ this.performLogin }
            disabled={ this.state.isLoading || !this.state.username || !this.state.password }
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
