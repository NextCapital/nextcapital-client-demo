import React from 'react';
import classnames from 'classnames';

/**
 * Renders a simple page. For embedded applications, use the `fullScreen` prop.
 */
const Page = (props) => (
  <div className={ classnames('demo-page', props.className, { 'full-screen': props.fullScreen }) }>
    { props.children }
  </div>
);

export default Page;
