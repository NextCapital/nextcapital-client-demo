module.exports = {
  plugins: [
    '@babel/plugin-transform-class-static-block'
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          chrome: '108',
          firefox: '115',
          safari: '15'
        }
      }
    ],
    '@babel/preset-react'
  ]
};
