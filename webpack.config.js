const path = require('path');
const webpack = require('webpack');

const environments = require('./js/environments');

// Select the environment config for the CORS proxy
const envConfig = environments[process.env.NC_ENV];

if (!envConfig) {
  throw new Error('set the NC_ENV environment variable before running');
}

module.exports = {
  entry: path.resolve(__dirname, 'js/index.jsx'),
  output: {
    filename: 'demo.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'external-api-demo',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        parser: {
          amd: false // needed to use the auto-generated swagger api client
        }
      },
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'js')],
        use: ['babel-loader']
      }
    ]
  },
  externals: {
    'nextcapital-api': 'NCApi',
    pdfjs: 'PDFJS'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'nextcapital-client': path.resolve(__dirname, 'nextcapital-client/nextcapital-client.js'),
    }
  },
  plugins: [
    // Allows using `process.env.NC_ENV` in webpacked code as normal
    new webpack.DefinePlugin({
      'process.env.NC_ENV': JSON.stringify(process.env.NC_ENV)
    })
  ],
  devtool: 'source-map',
  mode: 'development',
  target: 'web',
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'dist'),
    https: false,
    hot: true,
    proxy: [{ // Handles the CORS proxy for the selected environment
      context: '/api',
      target: envConfig.proxyEndpoint,
      changeOrigin: true,
      secure: true
    }, {
      context: '/as',
      target: envConfig.proxyAuthEndpoint,
      changeOrigin: true,
      secure: true
    }]
  },
};
