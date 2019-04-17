const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const cwd = require('../utils/cwd')
const siteConfig = require('./webpack.base.js')

const outputPath = cwd('_site')

module.exports = merge(siteConfig, {
  target: 'web',

  mode: 'production',

  output: {
    filename: 'js/[name].[chunkhash].js',
    path: outputPath,
    publicPath: '/',
  },

  externals: {
    lodash: 'lodash'
  },

  module: {},

  plugins: [
    // 这个地方使用 contenthash 避免使用 chunkhash 时 css 未发生变化，chunk发生变化而重新构建 css。
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new WebpackBundleAnalyzer(),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
          reuseExistingChunk: true,
          priority: 10,
          automaticNameDelimiter: '-',
        }
      },
    },
  },

  performance: {
    hints: 'error',
  },
})
