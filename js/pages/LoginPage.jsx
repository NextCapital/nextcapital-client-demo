import React from 'react';

import {
  Redirect,
  withRouter
} from 'react-router-dom';

import {
  getClient,
  isClientReady
} from '@nextcapital/client';

import Page from '../components/Page';
import SimpleSpacer from '../components/SimpleSpacer';

class LoginPage extends React.Component {
  state = {
    isLoading: false,
    isFailed: false,
    username: '',
    password: '',
    jwt: ''
  };

  /**
   * Logs in against the `Authenticate` module, either using credentials or JWT. When this is done,
   * it will:
   *
   * - resolve the `onNeedsAuthentication` deferred promise
   * - store the token in session storage, so auth will persist after refresh
   * - redirect to the main demo page
   *
   * Again, in real-life scenarios, the `authenticate` call should not make use of user input for
   * the username/password/jwt.
   */
  performLogin = async () => {
    const { Authentication } = getClient();
    this.setState({ isLoading: true });

    const loginRequest = this.state.jwt ?
      Authentication.jwtLogin({ jwt: this.state.jwt }) :
      Authentication.credentialLogin({
        username: this.state.username,
        password: this.state.password
      });

    try {
      // perform the actual login call
      await loginRequest;

      // tell the client that we have auth now
      this.props.authRequest.resolve();
      await this.props.authRequest.promise;

      // set the token on session so it will persist after refresh
      sessionStorage.setItem('nc-local-token', Authentication.getLocalToken());

      // redirect to the demo homepage
      this.props.history.push('/');
    } catch (error) {
      this.setState({ isLoading: false, isFailed: true });
    }
  };

  render() {
    if (isClientReady()) { // don't show login page if logged in!
      return (<Redirect to="/demos/" />);
    }

    return (
      <Page>
        <SimpleSpacer>
          <h1>NextCapital Client Demo Login</h1>
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
            disabled={
              this.state.isLoading ||
              (!this.state.jwt && (!this.state.username || !this.state.password))
            }
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
