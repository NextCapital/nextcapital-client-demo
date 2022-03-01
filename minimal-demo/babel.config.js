module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          chrome: '79',
          firefox: '72',
          safari: '13',
          edge: '79'
        }
      }
    ],
    '@babel/preset-react'
  ]
};
