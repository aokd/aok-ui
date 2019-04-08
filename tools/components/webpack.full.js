const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('../base.config.js')
const cwd = require('../utils/cwd')

const componentsPath = cwd('components', 'index.ts')
const themePath = cwd('components', 'style', 'index.styl')
const outputPath = cwd('dist')

const config = merge(baseConfig, {
  mode: 'production',

  devtool: "#source-map",

  entry: [
    themePath,
    componentsPath,
  ],

  output: {
    path: outputPath,
    library: 'Aok',
    libraryTarget: 'umd',
  },

  externals: {
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM'
    }
  }
})

module.exports = [
  // normal
  merge(config, {
    output: {
      filename: 'aok.js'
    },
    optimization: {
      minimize: false
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'aok.css'
      })
    ]
  }),
  // minify
  merge(config, {
    output: {
      filename: 'aok.min.js'
   },
    optimization: {
      minimizer: [
        new TerserPlugin({
          sourceMap: true
        }),
        new OptimizeCssAssetsPlugin()
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'aok.min.css'
      })
    ]
  })
]
