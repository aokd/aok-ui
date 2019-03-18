const HTMLWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const cwd = require('../utils/cwd')
const siteConfig = require('./webpack.base.js')

const outputPath   = cwd('dist')
const templatePath = cwd('site', 'static', 'index.html')

module.exports = merge(siteConfig, {
  target: 'web',

  mode: 'development',

  output: {
    filename: 'js/[name].[hash].js',
    path: outputPath,
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: templatePath,
      inject: true,
    }),
  ],
})
