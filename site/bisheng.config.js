const path = require('path')

module.exports = {
  port: 10315,
  entryName: 'index',
  root: '/',
  output: './dist',
  theme: 'bisheng-theme-one',
  htmlTemplate: path.join(__dirname, './theme/static/template.html'),
  themeConfig: {
    home: '/',
  },
  webpackConfig(config) {
    return config
  }
};
