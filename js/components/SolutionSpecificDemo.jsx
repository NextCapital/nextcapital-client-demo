import React from 'react';

import { getClient } from '@nextcapital/client';

const SolutionSpecificDemo = (props) => {
  const client = getClient();

  if (client[props.module]) {
    return props.getChildren();
  }

  return (
    <div>
      Sorry, this demo isn't available for the current solution.
    </div>
  );
};

export default SolutionSpecificDemo;
