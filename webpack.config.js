const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');

const getAbsolutePath = (relativePath) => path.resolve(__dirname, relativePath);

module.exports = ({ env = 'sit', solution = 'nextcapital' }) => ({
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
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      // Needed so that peerDependency packages use the package from the root when linked
      // https://medium.com/@penx/managing-dependencies-in-a-node-package-so-that-they-are-compatible-with-npm-link-61befa5aaca7
      react: getAbsolutePath('./node_modules/react'),
      'react-dom': getAbsolutePath('./node_modules/react-dom'),
      lodash: getAbsolutePath('./node_modules/lodash')
    }
  },
  plugins: [
    new webpack.DefinePlugin({ // allow us to use the solution ID in code
      SOLUTION_ID: JSON.stringify(solution),
      NC_ENV: JSON.stringify(_.toUpper(env))
    })
  ],
  devtool: 'source-map',
  mode: 'development',
  target: 'web'
});
