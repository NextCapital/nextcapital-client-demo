import React from 'react';

const SimpleCard = (props) => (
  <div className="demo-simple-card">
    <div className="simple-card-header">
      { props.title }
    </div>
    <div className="simple-card-content">
      { props.children }
    </div>
  </div>
);

export default SimpleCard;
