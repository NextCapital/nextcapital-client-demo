import React from 'react';

import { DocVaultDemo } from 'nextcapital-client';

import Page from '../components/Page';

/**
 * Renders a fully-interactive doc vault embedded application with a single line of code!
 */
const EmbeddedDocVault = () => (
  <Page
    title="Embedded Doc Vault"
    fullScreen
  >
    { DocVaultDemo.render() }
  </Page>
);

export default EmbeddedDocVault;
