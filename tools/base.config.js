const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const cwd = require('./utils/cwd')

const sitePath         = cwd('site', 'index.tsx')
const tslintPath       = cwd('tslint.json')
const tsconfigPath      = cwd('tsconfig.json')
const componentsPath   = cwd('components')
const yamlLoaderPath   = cwd('tools', 'loaders', 'yaml-loader.js')
const highlightCssPath = cwd('node_modules', 'highlight.js/styles/color-brewer.css')

module.exports = {

  resolve: {
    alias: {
      'aok': componentsPath
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  module: {
    rules: [
      { 
        test: /\.(js|jsx|md)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        }],
      },
      {
        test: /\.css$/,
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