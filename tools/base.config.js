const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cwd = require('./utils/cwd')
const env = require('./utils/env')

const sitePath         = cwd('site', 'index.tsx')
const tslintPath       = cwd('tslint.json')
const tsconfigPath      = cwd('tsconfig.json')
const yamlLoaderPath   = cwd('tools', 'loaders', 'yaml-loader.js')
const highlightCssPath = cwd('node_modules', 'highlight.js/styles/color-brewer.css')
const componentsPath   = cwd('components')
const siteAliasPath    = cwd('site')

module.exports = {
  stats: {
    children: false
  },

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
      { 
        test: /\.(js|jsx|md)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['react-html-attrs'],
          },
        }],
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
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: tsconfigPath,
      tslint: tslintPath,
      checkSyntacticErrors: true,
    })
  ]
}