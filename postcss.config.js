const postcssImport = require('postcss-import')
const postcssUrl = require('postcss-url')
const autoprefixer = require('autoprefixer')


module.exports =  {
  plugins: [
    postcssImport(),
    postcssUrl(),
    autoprefixer({
      'browsers': [
        'last 2 versions',
        'Firefox ESR',
        '> 1%',
        'ie >= 9',
        'iOS >= 8',
        'Android >= 4'
      ]
    })
  ]
}
