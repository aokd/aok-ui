const fm = require('front-matter')
const MarkdownIt = require('markdown-it')
const hl = require('markdown-it-highlightjs')
const md = new MarkdownIt()
md.use(hl)

module.exports = {
  renderDemo: function (text) {
    const { attributes, body } = fm(text)
    attributes.description = attributes.description
      ? md.render(attributes.description)
      : ''
    const meta = Object.assign({ content: {} }, attributes)
    const tokens = md.parse(body)
    let source = ''
    let rendered = ''
    let lang = 'UNKOWNN'
    let contentProcessing = false
    let content = ''
    let arr = []
    let components = {}

    for (let i = 0, l = tokens.length; i < l; i++) {
      const token = tokens[i]
      const { type } = token

      if (type === 'fence') {
        source = token.content
        rendered = md.renderer.render([token], md.options)
      } else if (type === 'paragraph_open') {
        contentProcessing = true
        arr = []
      } else if (type === 'paragraph_close') {
        contentProcessing = false
        content = md.renderer.render(array, md.options)
        meta.content[lang] = contents
      } else if (contentProcessing) {
        arr.push(token)
      }
    }

    return {
      meta,
      source,
      rendered,
      components
    }
  }
}