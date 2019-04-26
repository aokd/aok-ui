const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('../base.config.js')
const cwd = require('../utils/cwd')

const componentsPath = cwd('index.ts')
const outputPath = cwd('dist')

const config = merge.smart(baseConfig, {
  mode: 'production',

  devtool: '#source-map',

  entry: componentsPath,

  output: {
    path: outputPath,
    library: 'Aok',
    libraryTarget: 'umd',
  },

  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
  },
})

module.exports = [
  // normal
  merge.smart(config, {
    name: 'normal',
    output: {
      filename: 'aok.js',
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'aok.css',
      }),
    ],
  }),
  // minify
  merge.smart(config, {
    name: 'minify',
    output: {
      filename: 'aok.min.js',
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          cache: true,
          sourceMap: true,
        }),
        new OptimizeCssAssetsPlugin(),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'aok.min.css',
      }),
    ],
  }),
]
