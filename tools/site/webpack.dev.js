const HTMLWebpackPlugin = require('html-webpack-plugin')
// const path = require('path')
const merge = require('webpack-merge')
const cwd = require('../utils/cwd')
const siteConfig = require('./webpack.base.js')

const outputPath = cwd('dist')
const templatePath = cwd('site', 'static', 'index.html')

module.exports = merge(siteConfig, {
  target: 'web',

  mode: 'development',

  devtool: 'source-map',

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

  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true,
    publicPath: './dist',
  },
})
