const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'index.jsx'),
  output: { // output to minimal-demo/dist/demo.js
    filename: 'demo.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: { // setup babel to transpile JSX
    rules: [
      {
        test: /\.jsx?$/, // runs all custom js through babel
        include: [__dirname],
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  devtool: false,
  mode: 'production',
  target: 'web'
};
