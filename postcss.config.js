const postcssImport = require('postcss-import')
const postcssUrl = require('postcss-url')
const autoprefixer = require('autoprefixer')


module.exports =  {
  plugins: [
    postcssImport(),
    postcssUrl(),
    autoprefixer()
  ]
}
