const merge = require('webpack-merge')
const fs = require('fs')
const baseConfig = require('../base.config.js')
const cwd = require('../utils/cwd')

const componentsPath = cwd('components')
const outputPath = cwd('lib')

const mode = 'production'
const entry = Object.create(null)
const paths = fs.readdirSync(componentsPath, {
  withFileTypes: true
})

paths.forEach((path) => {
  if (!path.isDirectory()) {
    return
  }
  try {
    const componentEntryPath = cwd('components', path.name, 'index.tsx')
    if (fs.statSync(componentEntryPath).isFile()){
      entry[path.name] = componentEntryPath
    }
  } catch(err) {
    return
  }
})

module.exports = merge(baseConfig, {
  mode,

  entry,

  output: {
    path: outputPath
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