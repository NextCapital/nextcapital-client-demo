import React from 'react';
import classnames from 'classnames';

const WidgetBox = ({ width, height, children }) => {
  const classes = classnames('widget-box', {
    [`width-${width}`]: width,
    [`height-${height}`]: height
  });

  return (
    <div class={ classes }>
      { children }
    </div>
  );
};

export default WidgetBox;
