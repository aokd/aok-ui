const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cwd = require('./utils/cwd')
const env = require('./utils/env')

const yamlLoaderPath   = cwd('tools', 'loaders', 'yaml-loader.js')
const componentsPath   = cwd('components')
const siteAliasPath    = cwd('site')

module.exports = {

  resolve: {
    alias: {
      aok: componentsPath,
      site: siteAliasPath,
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          env.isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
              importLoaders: 1,
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
      {
        test: /\.(js|jsx|md)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }]
      },
      {
        test: /\.yaml$/,
        exclude: /node_modules/,
        use: yamlLoaderPath,
      },
    ]
  },
  // https://github.com/Realytics/fork-ts-checker-webpack-plugin/issues/229
  // plugins: [
  //   new ForkTsCheckerWebpackPlugin({
  //     tsconfig: tsconfigPath,
  //     tslint: tslintPath,
  //     checkSyntacticErrors: true,
  //   })
  // ]
}