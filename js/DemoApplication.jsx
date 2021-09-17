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
  waitForConfiguredClient
} from '@nextcapital/client';

import Page from './components/Page';
import DemoHome from './pages/DemoHome';
import EmbeddedPlanning from './pages/EmbeddedPlanningDemo';
import CopyHelperDemo from './pages/CopyHelperDemo';
import ColorService from './pages/ColorService';

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
  },
  {
    name: 'Copy Helper',
    route: '/demos/copy-helper',
    component: CopyHelperDemo
  },
  {
    name: 'Color Service',
    route: '/demos/color-service',
    component: ColorService
  }
];

/**
 * The left side of the header. Renders the dropdown demo selector.
 *
 * This needs to be extracted to a component to so it can use react-router hooks.
 *
 * @returns {React.Component} the left side of the header
 */
const HeaderLeft = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className="header-left">
      <h2 className="title">NextCapital Client Demo</h2>
      <label htmlFor="demo-select">choose demo: </label>
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
 *
 * @returns {React.Component} the name of the current demo
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
    isInitializing: true
  };

  /**
   * Waits for the client to configure, then sets the initializing state to false.
   */
  async componentDidMount() {
    await waitForConfiguredClient();
    this.setState({ isInitializing: false });
  }

  /**
   * Renders a helpful link to documentation.
   *
   * @returns {React.Component} the right section of the header bar
   */
  renderHeaderRight() {
    return (
      <div className="header-right">
        <a href="https://github.com/NextCapital/nextcapital-client-demo/wiki">Documentation</a>
      </div>
    );
  }

  /**
   * Renders the top header bar.
   *
   * @returns {React.Component} the top header bar
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
   *
   * @returns {React.Component} the current demo
   */
  renderCurrentDemo() {
    if (this.state.isInitializing) {
      return (
        <div className="current-demo">
          <Page>
            <div>The configure call is running...</div>
          </Page>
        </div>
      );
    }

    return (
      <div className="current-demo">
        <Switch>
          {
            _.map(demos, (demo) => (
              <Route
                exact
                key={ demo.route }
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

  /**
   * Renders all of the routes for the application.
   *
   * @returns {React.Component} the demo application
   */
  render() {
    return (
      <Router>
        <div className="demo-application">
          <Switch>
            <Route
              exact
              path='/'
              render={ () => <Redirect to="/demos" /> }
            />
            <Route path="/demos">
              { this.renderDemos() }
            </Route>
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
