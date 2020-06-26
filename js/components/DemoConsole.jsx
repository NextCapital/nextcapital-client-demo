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
 * Render a `FakeConsole` model. Updates whenever something is written to it automatically.
 */
class DemoConsole extends React.Component {
  _render = () => this.setState({});

  componentDidMount() {
    this.props.console.addListener(this._render);
  }

  componentWillUnmount() {
    this.props.console.removeListener(this._render);
  }

  render() {
    const messages = this.props.console.getMessages();

    return (
      <div className="demo-console">
        {
          _.isEmpty(messages) && (
            <div className='console-entry'>console output will appear here</div>
          )
        }
        {
          _.map(messages, (message, index) => (
            <div
              key={ index }
              className={ classnames('console-entry', { error: message.isError }) }
            >
              { message.text }
            </div>
          ))
        }
      </div>
    );
  }
}

export default DemoConsole;
