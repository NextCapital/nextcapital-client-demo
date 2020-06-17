import React from 'react';
import classnames from 'classnames';

const Page = (props) => (
  <div className={ classnames('demo-page', { 'full-screen': props.fullScreen }) }>
    <div className="page-title">{ props.title }</div>
    <div className="page-content">{ props.children }</div>
  </div>
);

export default Page;
