import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

/**
 * Renders a simple page. For embedded applications, use the `fullScreen` prop.
 *
 * @param {object} props React props.
 * @returns {React.Component} A simple page.
 */
const Page = (props) => (
  <div className={ classnames('demo-page', props.className, { 'full-screen': props.fullScreen }) }>
    { props.children }
  </div>
);

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  fullScreen: PropTypes.bool
};

export default Page;
