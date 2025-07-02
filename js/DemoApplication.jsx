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
import CurrentReadinessDemo from './pages/CurrentReadinessDemo';
import CurrentReadinessInteractiveDemo from './pages/CurrentReadinessInteractiveDemo';
import RetirementReportCardDemo from './pages/RetirementReportCardDemo';
import ExpressWorkplaceEnrollmentDemo from './pages/ExpressWorkplaceEnrollmentDemo';
import {
  ManagedCustomWorkplaceEnrollmentDemo,
  PointInTimeCustomWorkplaceEnrollmentDemo,
  CustomWorkplaceEnrollmentEnrollMethodDemo
} from './pages/CustomWorkplaceEnrollmentDemo';
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
    name: 'Current Readiness',
    route: '/demos/current-readiness',
    component: CurrentReadinessDemo
  },
  {
    name: 'Current Readiness (Interactive)',
    route: '/demos/current-readiness-interactive',
    component: CurrentReadinessInteractiveDemo
  },
  {
    name: 'Retirement Report Card',
    route: '/demos/retirement-report-card',
    component: RetirementReportCardDemo
  },
  {
    name: 'Express Workplace Enrollment',
    route: '/demos/express-workplace-enrollment',
    component: ExpressWorkplaceEnrollmentDemo
  },
  {
    name: 'Custom Workplace Enrollment (MA)',
    route: '/demos/custom-workplace-enrollment-ma',
    component: ManagedCustomWorkplaceEnrollmentDemo
  },
  {
    name: 'Custom Workplace Enrollment (PITA)',
    route: '/demos/custom-workplace-enrollment-pita',
    component: PointInTimeCustomWorkplaceEnrollmentDemo
  },
  {
    name: 'Custom Workplace Enrollment (Enroll Method)',
    route: '/demos/custom-workplace-enrollment-enroll-method',
    component: CustomWorkplaceEnrollmentEnrollMethodDemo
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
 * @returns {React.Component} The left side of the header.
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
              key={ key }
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
 * @returns {React.Component} The name of the current demo.
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
  // eslint-disable-next-line react/state-in-constructor
  state = {
    isInitializing: true,
    failedToConfigure: false
  };

  /**
   * Waits for the client to configure, then sets the initializing state to false.
   */
  async componentDidMount() {
    try {
      await waitForConfiguredClient();
      this.setState({ isInitializing: false });
    } catch {
      this.setState({ isInitializing: false, failedToConfigure: true });
    }
  }

  /**
   * Renders a helpful link to documentation.
   *
   * @returns {React.Component} The right section of the header bar.
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
   * @returns {React.Component} The top header bar.
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
   * @returns {React.Component} The current demo element.
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

    if (this.state.failedToConfigure) {
      return (
        <div className="current-demo">
          <Page>
            <div>The configure call failed. Check developer tools.</div>
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
   * @returns {React.Component} The demo application element.
   */
  render() {
    return (
      <Router>
        <div className="demo-application">
          <Switch>
            <Route
              exact
              path="/"
              render={ () => <Redirect to="/demos" /> }
            />
            <Route path="/demos">
              { this.renderDemos() }
            </Route>
            <Route path="*">
              404 - NOT FOUND
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default DemoApplication;
