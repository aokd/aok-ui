const merge = require('webpack-merge')
const cwd = require('../utils/cwd')
const siteConfig = require('./webpack.base.js')

const outputPath = cwd('dist')

module.exports = merge(siteConfig, {
  target: 'web',

  mode: 'development',

  devtool: 'source-map',

  output: {
    filename: 'js/[name].[hash].js',
    path: outputPath,
    publicPath: '/',
  },

  module: {},

  devServer: {
    hot: true,
    port: 8080,
    contentBase: cwd('static/'),
    historyApiFallback: true,
  },
})
