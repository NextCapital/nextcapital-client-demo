import React from 'react';

import { getClient } from '@nextcapital/client';

/**
 * Renders the result of the `getChildren` function if and only if the client has the
 * specified module. Otherwise, it will render a message noting that the demo is not
 * available for the given solution.
 *
 * This prevents errors by only calling `getChildren` if the demo module exists.
 */
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
