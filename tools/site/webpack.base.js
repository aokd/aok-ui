const merge = require('webpack-merge')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('../base.config.js')
const cwd = require('../utils/cwd')
const template = require('../utils/template')
const { renderDemo, renderApi } = require('../utils/render')

const templatePath = cwd('site', 'static', 'index.html')
const sitePath = cwd('site', 'index.tsx')
const siteAliasPath = cwd('site')
const componentsPath = cwd('components')

module.exports = merge(baseConfig, {

  resolve: {
    alias: {
      aok: componentsPath,
      site: siteAliasPath,
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  entry: {
    site: sitePath,
  },

  module: {
    rules: [
      {
        test: /\/components\/[^/]+\/demos\/[^/]+.md$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{
          loader: 'ware-loader',
          options: {
            raw: true,
            middleware (source) {
              return template('demo')(renderDemo(source))
            },
          },
        }],
      },
      {
        test: /\/components\/[^/]+\/index.(zh-CN|en-US).md/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{
          loader: 'ware-loader',
          options: {
            raw: true,
            middleware (source) {
              return template('api')(renderApi(source))
            },
          },
        }],
      },
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: templatePath,
      inject: true,
    }),
  ],
})
