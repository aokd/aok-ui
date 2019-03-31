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

  module: {
    rules: [
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

  devServer: {
    hot: true,
    port: 8080,
    contentBase: cwd('static/'),
    historyApiFallback: true,
  },
})
