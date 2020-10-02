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

const path = require('path');
const webpack = require('webpack');

module.exports = (env, { solution = 'nextcapital' }) => ({
  entry: path.resolve(__dirname, 'js/index.jsx'),
  output: {
    filename: 'demo.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // runs all custom js through babel
        include: [path.resolve(__dirname, 'js')],
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.DefinePlugin({ // allow us to use the solution ID in code
      SOLUTION_ID: JSON.stringify(solution)
    })
  ],
  devtool: 'source-map',
  mode: 'development',
  target: 'web',
  devServer: { // Config for `npm run start` dev server
    port: 8080,
    contentBase: path.join(__dirname, 'dist'),
    https: false,
    hot: true,
    proxy: [{ // Handles the CORS proxy for the SIT environment
      context: '/api',
      target: 'https://sit-pa.nextcapital.com',
      changeOrigin: true,
      secure: true
    }, {
      context: '/as',
      target: 'https://sit-idp.nextcapital.com',
      changeOrigin: true,
      secure: true
    }]
  },
});
