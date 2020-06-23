import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

import { hasSession } from 'nextcapital-client';

/**
 * A Route that redirects to the login page if not logged-in.
 */
const PrivateRoute = ({ children, ...props }) => (
  <Route
    {...props}
    render={
      () => (
        hasSession() ?
          children :
          <Redirect to='/login' />
      )
    }
  />
);

export default PrivateRoute;
