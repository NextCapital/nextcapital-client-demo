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
import _ from 'lodash';

import {
  HashRouter as Router,
  Switch,
  Redirect,
  Route,
  useHistory,
  useLocation
} from 'react-router-dom';

import {
  waitForConfiguredClient,
  isClientReady
} from '@nextcapital/client';

import PrivateRoute from './components/PrivateRoute';

import LoginPage from './pages/LoginPage';
import DemoHome from './pages/DemoHome';
import EmbeddedPlanning from './pages/EmbeddedPlanningDemo';

/**
 * We need the login page to be able to out-of-band resolve the `onNeedsAuthentication` promise.
 *
 * This is a simple implementation of a deferred promise for this purpose.
 */
const defer = () => {
  const result = {};

  result.promise = new Promise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};

// The set of demos to populate the dropdown with.
const demos = [
  {
    name: 'Demo Home',
    route: '/demos/',
    component: DemoHome
  },
  {
    name: 'Embedded Planning',
    route: '/demos/embedded-planning',
    component: EmbeddedPlanning
  }
];

/**
 * The left side of the header. Renders the dropdown demo selector.
 *
 * This needs to be extracted to a component to so it can use react-router hooks.
 */
const HeaderLeft = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className="header-left">
      <h2 className="title">NextCapital Client Demo</h2>
      <label for="demo-select">choose demo: </label>
      <select
        value={ location.pathname }
        onChange={ (event) => history.push(event.target.value) }
        id="demo-select"
      >
        {
          _.map(demos, (demo, key) => (
            <option
              key={ key}
              value={ demo.route }
            >
              { demo.name }
            </option>
          ))
        }
      </select>
    </div>
  );
};

/**
 * Renders the name of the current demo.
 *
 * This needs to be extracted to a component to so it can use react-router hooks.
 */
const HeaderTitle = () => {
  const location = useLocation();

  const match = _.find(demos, { route: location.pathname });
  const label = match ? match.name : 'NextCapital Client Demo';

  return (
    <div className="header-title">
      <h1>{ label }</h1>
    </div>
  );
};

class DemoApplication extends React.Component {
  state = {
    isInitializing: true,
    authRequest: defer()
  };

  /**
   * When the application mounts, authenticates the session. Re-uses the token from session storage
   * if set, and redirects to the login page otherwise.
   *
   * NOTE: In a real-life scenario, there will never be a login page. So, overall, the
   * authentication in this demo is more complex than it should be in real-life scenarios.
   *
   * See provided documented on how best to use the `authenticate` call.
   */
  async componentDidMount() {
    const { Authentication } = await waitForConfiguredClient();

    await Authentication.authenticate({
      onNeedsAuthentication: () => {
        const authRequest = defer();
        this.setState({ isInitializing: false, authRequest });
        return authRequest.promise;
      },
      token: sessionStorage.getItem('nc-local-token') // keep auth after refresh
    });

    // refresh the view
    this.setState({ isInitializing: false });
  }

  /**
   * Ends the current session, which in this case means just ditching the token and refreshing.
   */
  logout = () => {
    sessionStorage.removeItem('nc-local-token');
    window.location.reload();
  };

  /**
   * Renders the logout button.
   */
  renderHeaderRight() {
    return (
      <div className="header-right">
        <button
          className="logout"
          onClick={ this.logout }
        >
          Logout
        </button>
      </div>
    );
  }

  /**
   * Renders the top header bar.
   */
  renderHeader() {
    return (
      <div className="demo-header">
        <HeaderLeft />
        <HeaderTitle />
        { this.renderHeaderRight() }
      </div>
    );
  }

  /**
   * Renders a Route for each demo. See `react-router` documentation.
   */
  renderCurrentDemo() {
    return (
      <div className="current-demo">
        <Switch>
          {
            _.map(demos, (demo) => (
              <Route
                exact
                key={ demo.path }
                path={ demo.route }
                component={ demo.component }
              />
            ))
          }
          <Route path="/demos/*">
            DEMO NOT FOUND!
          </Route>
        </Switch>
      </div>
    );
  }

  renderDemos() {
    return (
      <div className="demo-container">
        { this.renderHeader() }
        { this.renderCurrentDemo() }
      </div>
    );
  }

  render() {
    if (this.state.isInitializing) {
      return (
        <span>running the configure call...</span>
      );
    }

    /**
     * Renders the login page or the current demo. See `react-router` documentation.
     */
    return (
      <Router>
        <div className="demo-application">
          <Switch>
            <Route
              exact
              path='/'
              render={
                () => isClientReady() ?
                  <Redirect to="/demos" /> :
                  <Redirect to="/login" />
              }
            />
            <Route
              exact
              path="/login"
              render={
                (props) => (
                  <LoginPage
                    {...props}
                    authRequest={ this.state.authRequest}
                  />
                )
              }
            />
            <PrivateRoute path="/demos">
              { this.renderDemos() }
            </PrivateRoute>
            <Route path='*'>
              404 - NOT FOUND
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default DemoApplication;
