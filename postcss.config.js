module.exports = function(context) {
  var plugins = [
    require('postcss-import')(),
    require('postcss-url')(),
    require('autoprefixer')({
      'browsers': [
        '> 1%',
        'Firefox ESR',
        'last 4 versions',
        'not ie < 9'
      ]
    })
  ]

  return {
    from: context.from,
    plugins: plugins,
    to: context.to,
  }
}
