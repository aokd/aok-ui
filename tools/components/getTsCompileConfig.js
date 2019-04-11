const assign = require('object-assign')
const defaultTsCompilerOptions = require('../../tsconfig.json').compilerOptions

module.exports = function () {
  return assign(
    {
      noUnusedParameters: true,
      noUnusedLocals: true,
      strictNullChecks: true,
      target: 'es6',
      jsx: 'preserve',
      moduleResolution: 'node',
      declaration: true,
      allowSyntheticDefaultImports: true,
      sourceMap: true
    },
    defaultTsCompilerOptions
  )
}
