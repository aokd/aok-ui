const path = require('path')
const cwd = require('./utils/cwd')
const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const tslintPath     = cwd('tslint.json')
const tsconfigPath    = cwd('tsconfig.json')
const componentsPath = cwd('components')
const yamlLoaderPath = cwd('tools', 'loaders', 'yaml-loader.js')

module.exports = {

  resolve: {
    alias: {
      'aok': componentsPath
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'] 
  },

  module: {
    rules: [
      { 
        test: /\.(js|jsx|md)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }, 
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
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
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: tsconfigPath,
      tslint: tslintPath,
      checkSyntacticErrors: true,
    })
  ]
}