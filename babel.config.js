module.exports = {
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
