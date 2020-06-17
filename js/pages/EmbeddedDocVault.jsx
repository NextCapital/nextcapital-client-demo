import React from 'react';

import { DocVaultDemo } from 'nextcapital-client';

import Page from '../components/Page';

const EmbeddedDocVault = () => (
  <Page
    title="Embedded Doc Vault"
    fullScreen
  >
    { DocVaultDemo.render() }
  </Page>
);

export default EmbeddedDocVault;
