import React from 'react';

const Page = (props) => (
  <div className="demo-page">
    <div className="page-title">{ props.title }</div>
    <div className="page-content">{ props.children }</div>
  </div>
);

export default Page;
