import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

/**
 * Renders children with space between them, either vertically or horizontally.
 *
 * @param {object} props React props.
 * @param {React.Component} [props.children] The children of the spacer component.
 * @param {boolean} [props.horizontal] Whether or not to lay the children out horizontally.
 * @returns {React.Component} Children with space between them.
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

SimpleSpacer.propTypes = {
  children: PropTypes.node,
  horizontal: PropTypes.bool
};

export default SimpleSpacer;
