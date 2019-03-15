module.exports = function (data) {
  var content = data.content

  if (Array.isArray(content)) {
    content.forEach(function (node) {
      if (!Array.isArray(node)) {
        return
      }

      var pre = node[0]
      if (pre !== 'pre') {
        return
      }

      var highlight = node[1]
      if (
        typeof highlight !== 'object'
        || !highlight.hasOwnProperty('lang')
        || !highlight.hasOwnProperty('highlighted')
      ) {
        return
      }

      var code = node[2]
      if (!Array.isArray(code) || code[0] !== 'code') {
        return
      }

      data.code = code[1]
      data.highlighted = highlight.highlighted
      data.lang = highlight.lang
    })
  }

  return data
}
