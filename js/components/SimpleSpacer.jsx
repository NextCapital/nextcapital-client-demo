import _ from 'lodash';
import React from 'react';

const SimpleSpacer = ({ children }) => {
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
    <div className="demo-simple-spacer">
      { wrappedChildren }
    </div>
  );
};

export default SimpleSpacer;
