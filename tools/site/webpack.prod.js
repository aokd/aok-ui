const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const cwd = require('../utils/cwd')
const siteConfig = require('./webpack.base.js')

const outputPath = cwd('dist')

module.exports = merge(siteConfig, {
  target: 'web',

  mode: 'production',

  output: {
    filename: 'js/[name].[chunkhash].js',
    path: outputPath,
    publicPath: '/',
  },

  externals: {},

  module: {
    rules: [
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
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
    // 这个地方使用 contenthash 避免使用 chunkhash 时 css 未发生变化，chunk发生变化而重新构建 css。
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new WebpackBundleAnalyzer(),
  ],

  optimization: {
    minimize: true,
    minimizer: [

    ],
    splitChunks: {
      cacheGroups: {
        chunks: 'all',
        vendors: {
          name: 'vendor',
          filename: '[name].[chunkhash].js',
          enforce: true,
          reuseExistingChunk: true,
          priority: 10,
        },
        'reset-styles': {
          name: 'styles',
          test: (module) => {
            // if (count === 0) {
            const { resource } = module
            if (!resource) {
              return false
            }
            if (
              resource.match(/node_modules\/highlight.js\/styles\/color-brewer\.css/)
              || resource.match(/node_modules\/normalize.css\/normalize\.css/)
              || resource.match(/\/site[/s]+markdown\.styl/)
              || resource.match(/\/site[/s]+reset-style\.styl/)
              || resource.match(/\/site[/s]+variable\.styl/)
            ) {
              return true
            }
            return false
          },
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  performance: {
    hints: 'error',
  },
})
