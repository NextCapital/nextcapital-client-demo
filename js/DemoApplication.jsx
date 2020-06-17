import React from 'react';
import _ from 'lodash';

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import LoginPage from './pages/LoginPage';
import DemoHome from './pages/DemoHome';

import { hasSession, endSession, startSession } from 'nextcapital-client';

const demos = [
  {
    path: 'doc-vault',
    name: 'Embedded Doc Vault',
    component: null
  },
  {
    path: 'implement-plan',
    name: 'Embedded Implement Plan',
    component: null
  },
  {
    path: 'quick-plan',
    name: 'Embedded Mini App',
    component: null
  },
  {
    path: 'questionnaire',
    name: 'Embedded Profile Questionnaire',
    component: null
  },
  {
    path: 'api-profile',
    name: 'Basic Profile API',
    component: null
  },
  {
    path: 'api-accounts',
    name: 'Accounts/Incomes API',
    component: null
  },
  {
    path: 'api-doc-vault',
    name: 'Documents API',
    component: null
  },
  {
    path: 'api-implement-plan',
    name: 'Implement Plan API',
    component: null
  }
];

class DemoApplication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInitializing: true
    };
  }

  componentDidMount() {
    console.log('Start NextCapital Client session...');
    startSession({
      onCookiesDisabled: () => window.alert('Cookies disabled! Auth will not work.'),
      onNeedsAuth: () => console.log('Authentication needed! Redirecting to login via react-router...')
    }).then(() => {
      console.log('NextCapital Client session initialize logic has completed!');
      this.setState({ isInitializing: false });
    }).catch((ex) => {
      console('NextCapital Client failed to start session....');
      console.error(ex);
    });
  }

  renderSidebarTop() {
    return (
      <div className="sidebar-header">
        <h1 className="title">NextCapital Demo App</h1>
        <button
          className="logout"
          onClick={ () => endSession() }
        >
          Logout
        </button>
      </div>
    );
  }

  renderSidebar() {
    return (
      <div className="demo-sidebar">
        { this.renderSidebarTop() }
        <div className="sidebar-links">
        {
          _.map(demos, (demo) => (
            <Link
              key={ demo.path }
              to={ demo.path }
            >
              { demo.name }
            </Link>
          ))
        }
        </div>
      </div>
    );
  }

  renderCurrentDemo() {
    return (
      <div className="current-demo">
        <Switch>
          <Route exact path="demos/" component={ DemoHome } />
          {
            _.map(demos, (demo) => (
              <Route
                key={ demo.path }
                path={ demo.path }
                component={ demo.component }
              />
            ))
          }
          <Route path="demos/*">
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
        <span>loading...</span>
      );
    }

    return (
      <Router>
        <div className="demo-application">
          <Switch>
            <Route
              exact
              path='/'
              render={
                () => hasSession() ?
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
