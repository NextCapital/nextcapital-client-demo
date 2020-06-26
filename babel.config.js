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

module.exports = {
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          chrome: '79',
          firefox: '72',
          safari: '13',
          edge: '18'
        }
      }
    ],
    '@babel/preset-react'
  ]
};
