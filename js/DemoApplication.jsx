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
  Link
} from 'react-router-dom';

import {
  isClientReady
} from '@nextcapital/client';

import PrivateRoute from './components/PrivateRoute';

import LoginPage from './pages/LoginPage';
import DemoHome from './pages/DemoHome';

// Defines the set of demos in the app. Combines a route, display name, and page component.
const embeddedAppApiDemos = [
];

const dataApiDemos = [
];

const miscDemos = [
];

const demos = embeddedAppApiDemos.concat(dataApiDemos, miscDemos);

class DemoApplication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInitializing: true
    };
  }

  /**
   * When the application mounts, recover the session. If login is needed, the app will route to
   * the login page automatically.
   */
  componentDidMount() {
    // console.log('Start NextCapital Client session...');
    // startSession({
    //   onCookiesDisabled: () => window.alert('Cookies disabled! Auth will not work.'),
    //   onNeedsAuth: () => console.log('Authentication needed! Redirecting to login via react-router...')
    // }).then(() => {
    //   console.log('NextCapital Client session initialize logic has completed!');
    //   this.setState({ isInitializing: false });
    // }).catch((ex) => {
    //   console.error('NextCapital Client failed to start session....');
    //   console.error(ex);
    // });
  }

  /**
   * Ends the current session, reloading the page when complete to clear any cached models.
   */
  logout = () => {
    window.location.reload();
  };

  renderSidebarTop() {
    return (
      <div className="sidebar-header">
        <h2 className="title">NextCapital Demo App</h2>
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
   * Renders a Link to each demo.
   */
  renderSidebar() {
    return (
      <div className="demo-sidebar">
        { this.renderSidebarTop() }
        <div className="sidebar-links">
          <h3>Embedded App API Demos</h3>
          {
            _.map(embeddedAppApiDemos, (demo) => (
              <Link
                key={ demo.path }
                to={ `/demos/${demo.path}` }
              >
                { demo.name }
              </Link>
            ))
          }
        </div>
        <div className="sidebar-links">
          <h3>Data API Demos</h3>
          {
            _.map(dataApiDemos, (demo) => (
              <Link
                key={ demo.path }
                to={ `/demos/${demo.path}` }
              >
                { demo.name }
              </Link>
            ))
          }
        </div>
        <div className="sidebar-links">
          <h3>Misc Demos</h3>
          {
            _.map(miscDemos, (demo) => (
              <Link
                key={ demo.path }
                to={ `/demos/${demo.path}` }
              >
                { demo.name }
              </Link>
            ))
          }
        </div>
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
          <Route exact path="/demos/" component={ DemoHome } />
          {
            _.map(demos, (demo) => (
              <Route
                exact
                key={ demo.path }
                path={ `/demos/${demo.path}` }
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
        { this.renderSidebar() }
        { this.renderCurrentDemo() }
      </div>
    );
  }

  render() {
    if (this.state.isInitializing) {
      return (
        <span>starting session...</span>
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
            <Route exact path="/login" component={ LoginPage } />
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
