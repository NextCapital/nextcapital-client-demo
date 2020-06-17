import React from 'react';

import {
  Redirect,
  withRouter
} from 'react-router-dom';

import { hasSession, authenticateSession } from 'nextcapital-client';

import Page from '../components/Page';

class LoginPage extends React.Component {
  performLogin = () => {
    return authenticateSession({
      username: 'advisor@transamerica.com',
      password: 'Password2'
    }).then(() => this.props.history.push('/'));
  };

  render() {
    if (hasSession()) {
      return (<Redirect to="/demos" />);
    }

    return (
      <Page title="Login">
        <button onClick={ this.performLogin }>Login</button>
      </Page>
    );
  }
}

export default withRouter(LoginPage);
