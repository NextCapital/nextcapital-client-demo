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

import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';

/**
 * Renders children with space between them, either vertically or horizontally.
 */
const SimpleSpacer = ({ children, horizontal }) => {
  const wrappedChildren = React.Children.map(children, (child, index) => {
    if (_.isNil(child)) {
      return null;
    }

    return (
      <div
        key={ index }
        className="simple-spacer-child"
      >
        { child }
      </div>
    );
  });

  return (
    <div className={ classnames('demo-simple-spacer', { horizontal }) }>
      { wrappedChildren }
    </div>
  );
};

export default SimpleSpacer;
