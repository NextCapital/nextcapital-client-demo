import PropTypes from 'prop-types';
import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

import { isClientReady } from '@nextcapital/client';

/**
 * A Route that redirects to the login page if not logged-in.
 *
 * @param {object} options React props
 * @param {React.Component} [options.children] the children of the route
 * @param {object} [options.props] the props excluding the children
 * @returns {React.Component} a Route
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

PrivateRoute.propTypes = {
  children: PropTypes.node
};

export default PrivateRoute;
