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
      '@':   path.join(process.cwd(), 'components'),
      aokui: path.join(process.cwd(), 'components'),
      site:  path.join(process.cwd(), 'site'),
    }

    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx']

    if (isDev) {
      config.devtool = 'source-map'
    }

    config.module.rules.push({
      test: /\.styl$/,
      use: [
        {
          loader: 'style-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]',
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'stylus-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    })

    config.module.rules.push({
      test: /\.html$/,
      use: [ 'html-loader' ]
    })

    // 必须 return config
    return config
  },
  entryName: 'aokui',
  root: '/',
}
