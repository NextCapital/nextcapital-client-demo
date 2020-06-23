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
