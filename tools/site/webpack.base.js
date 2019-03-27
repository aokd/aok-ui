const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('../base.config.js')
const cwd = require('../utils/cwd')
const template = require('../utils/template')
const { renderDemo, renderApi } = require('../utils/render')

const resetStylePath = cwd('site', 'static', 'index.ts')
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
    reset: resetStylePath,
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
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]',
            },
          },
          'postcss-loader',
          {
            loader: 'stylus-loader',
            options: {
              import: [
                '~site/static/variable.styl',
              ],
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name][chunkhash:8].css',
    }),
  ],
})
