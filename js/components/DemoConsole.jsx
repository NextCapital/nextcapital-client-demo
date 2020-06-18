import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';

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
