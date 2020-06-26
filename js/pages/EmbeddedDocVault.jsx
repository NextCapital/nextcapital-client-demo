/**
 * Copyright Notice
 * Copyright (c) 2020 NextCapital Group. All Rights Reserved.
 *
 * THIS IS UNPUBLISHED CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF NEXTCAPITAL GROUP.
 *
 * The copyright notice above does not evidence any actual or intended publication
 * of such source code.
 *
 * Copyright (c) 2020
 * NextCapital Group
 * All Rights Reserved.
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 * CONFIDENTIAL AND PROPRIETARY NOTICE
 * This source code is unpublished confidential and proprietary information constituting,
 * or derived under license from NextCapital Group's software.
 */

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
