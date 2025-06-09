import React from 'react';
import classnames from 'classnames';

/**
 * Renders a box to contain a widget.
 *
 * @param {object} options
 * @param {string} options.width One of 'small', 'medium', 'large', 'full', 'auto'.
 * @param {string} options.height Currently only supports 'auto'.
 * @param {React.Component} options.children Content to render in the widget.
 * @returns {React.Component}
 */
const WidgetBox = ({ width, height, children }) => {
  const classes = classnames('widget-box', {
    [`width-${width}`]: width,
    [`height-${height}`]: height
  });

  return (
    <div className={ classes }>
      { children }
    </div>
  );
};

export default WidgetBox;
