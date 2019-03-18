const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('../base.config.js')
const cwd = require('../utils/cwd')
const template = require('../utils/template')
const { renderDemo } = require('../utils/render')

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
            middleware: function (source) {
              return template('demo')(renderDemo(source))
            }
          }
        }]
      }
    ]
  }
})