const merge = require('webpack-merge')
const baseConfig = require('../base.config.js')
const cwd = require('../utils/cwd')
const template = require('../utils/template')
const { renderDemo, renderApi } = require('../utils/render')

const sitePath = cwd('site', 'index.tsx')

module.exports = merge(baseConfig, {
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
            middleware(source) {
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
            middleware(source) {
              return template('api')(renderApi(source))
            },
          },
        }],
      },
    ],
  },
})
