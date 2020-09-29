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
