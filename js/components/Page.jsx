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
import classnames from 'classnames';

/**
 * Renders a simple page with a title and content. For embedded applications, use the `fullScreen`
 * prop.
 */
const Page = (props) => (
  <div className={ classnames('demo-page', props.className, { 'full-screen': props.fullScreen }) }>
    <div className="page-title">{ props.title }</div>
    <div className="page-content">{ props.children }</div>
  </div>
);

export default Page;
