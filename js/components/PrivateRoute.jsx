import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

import { isClientReady } from '@nextcapital/client';

/**
 * A Route that redirects to the login page if not logged-in.
 */
const PrivateRoute = ({ children, ...props }) => (
  <Route
    {...props}
    render={
      () => (
        isClientReady() ?
          children :
          <Redirect to='/login' />
      )
    }
  />
);

export default PrivateRoute;
