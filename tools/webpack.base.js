const path = require('path')
const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const tslintPath  = path.resolve(__dirname, '../tslint.json')
const tsconfigPath = path.resolve(__dirname, '../tsconfig.json')

module.exports = {
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }]
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }, {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
      }, {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
            transpileOnly: true
          }
        }]
      }, {
        test: /\.yaml$/,
        exclude: /node_modules/,
        use: path.resolve(__dirname, './loaders/yaml-loader.js')
      }
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