const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('../webpack.base.js')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const sitePath     = path.resolve(__dirname, '../../site/index.tsx')
const outputPath   = path.resolve(__dirname, '../../dist')
const templatePath = path.resolve(__dirname, '../../static/index.html')

console.info(__dirname)
module.exports = merge(baseConfig, {
  target: 'web',

  mode: 'development',

  entry: {
    site: sitePath,
  },

  output: {
    filename: 'js/[name].[hash].js',
    path: outputPath,
  },

  plugins: [
    new HTMLWebpackPlugin({
      title: 'aok-ui',
      template: path.resolve(__dirname, '../../static/index.html'),
      inject: true,
    })
  ]
})