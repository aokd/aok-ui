const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  port: 10315,
  source: './components',
  output: './dist',
  theme: './site/theme',
  themeConfig: {
    home: '/',
  },
  htmlTemplate: './site/theme/static/template.html',
  htmlTemplateExtraData: {
    isDev,
  },
  webpackConfig(config) {
    config.resolve.alias = {
      '@': path.join(process.cwd(), 'components'),
      aokui: path.join(process.cwd(), 'components'),
      site: path.join(process.cwd(), 'site'),
    }

    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx']

    if (isDev) {
      config.devtool = 'source-map'
    }

    // 这个地方必须 return config
    return config
  },
  entryName: 'aokui',
  root: '/',
}
