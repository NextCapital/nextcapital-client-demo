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

import { NextCapitalComponent } from '@nextcapital/client';

import Page from '../components/Page';

/**
 * This demo renders the planning UI using `NextCapitalComponent`.
 *
 * It really is this easy!
 */
const EmbeddedPlanningDemo = () => (
  <Page fullScreen>
    <NextCapitalComponent
      getEmbed={
        (client) => new client.EmbeddedPlanning({
          onExit: () => window.alert('exit callback called'),
          onEnrollment: () => window.alert('enrollment callback called')
        })
      }
      loadingContent={ 'loading...' }
    />
  </Page>
);

export default EmbeddedPlanningDemo;
