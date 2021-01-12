import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';

/**
 * Renders children with space between them, either vertically or horizontally.
 *
 * @param root0
 * @param root0.children
 * @param root0.horizontal
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
