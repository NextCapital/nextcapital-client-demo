import React from 'react';

/**
 * Renders a simple card with title and content.
 */
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
