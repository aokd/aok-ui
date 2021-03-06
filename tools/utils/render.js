const fm = require('front-matter')
const babel = require('@babel/core')
const types = require('@babel/types')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const MarkdownIt = require('markdown-it')
const hl = require('markdown-it-highlightjs')
const anchor = require('markdown-it-anchor')
const transliteration = require('transliteration')

function requireGenerator (varName, moduleName) {
  return types.variableDeclaration('var', [
    types.variableDeclarator(
      types.identifier(varName),
      types.callExpression(types.identifier('require'), [
        types.stringLiteral(moduleName),
      ]),
    ),
  ])
}

const defaultBabelConfig = {
  ast: true,
  babelrc: false,
  configFile: false,
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'last 2 versions',
            'Firefox ESR',
            '> 1%',
            'ie >= 8',
            'iOS >= 8',
            'Android >= 4',
          ],
        },
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators',
      { decoratorsBeforeExport: true },
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
}

module.exports = {
  renderDemo (text) {
    const md = new MarkdownIt()
    md.use(hl)

    const { attributes, body } = fm(text)
    attributes.description = attributes.description
      ? md.render(attributes.description)
      : ''
    const meta = Object.assign({ content: {} }, attributes)
    const tokens = md.parse(body)
    const lang = 'UNKOWNN'
    let source = ''
    let rendered = ''
    let content = ''
    let contentProcessing = false
    let arr = []

    for (let i = 0, l = tokens.length; i < l; i++) {
      const token = tokens[i]
      const { type } = token

      if (type === 'fence') {
        const { ast } = babel.transformSync(token.content, defaultBabelConfig)
        let renderReturn = null
        traverse(ast, {
          CallExpression (callPath) {
            const callPathNode = callPath.node
            if (
              callPathNode.callee
              && callPathNode.callee.object
              && callPathNode.callee.object.name === 'ReactDOM'
              && callPathNode.callee.property
              && callPathNode.callee.property.name === 'render'
            ) {
              renderReturn = types.returnStatement(callPathNode.arguments[0])
              callPath.remove()
            }
          },
        })
        const astProgramBody = ast.program.body
        astProgramBody.unshift(requireGenerator('ReactDOM', 'react-dom'))
        astProgramBody.unshift(requireGenerator('React', 'react'))

        if (renderReturn) {
          astProgramBody.push(renderReturn)
        }
        const codeBlock = types.BlockStatement(astProgramBody)
        const previewFunction = types.functionDeclaration(
          types.Identifier('aokReactPreviewer'),
          [],
          codeBlock,
        )
        source = generator(types.program([previewFunction]), {}, token.content).code
        rendered = md.renderer.render([token], md.options)
      } else if (type === 'paragraph_open') {
        contentProcessing = true
        arr = []
      } else if (type === 'paragraph_close') {
        contentProcessing = false
        content = md.renderer.render(arr, md.options)
        meta.content[lang] = content
      } else if (contentProcessing) {
        arr.push(token)
      }
    }

    return {
      meta: JSON.stringify(meta),
      source,
      rendered,
    }
  },
  renderApi (text) {
    const md = new MarkdownIt()
      .use(hl)
      .use(anchor, {
        level: [1, 2, 3],
        permalinkBefore: false,
        permalink: true,
        slugify: t => `aok-${transliteration.slugify(t)}`,
        permalinkSymbol: '#',
        renderPermalink: (slug, opts, state, idx) => {
          const space = () => Object.assign(new state.Token('text', '', 0), { content: ' ' })
          const linkTokens = [
            Object.assign(new state.Token('link_open', 'a', 1), {
              attrs: [
                ['class', opts.permalinkClass],
                ['href', opts.permalinkHref(slug, state)],
                ['aria-hidden', 'true'],
              ],
            }),
            Object.assign(new state.Token('html_block', '', 0), { content: opts.permalinkSymbol }),
            new state.Token('link_close', 'a', -1),
          ]
          const position = {
            false: 'push',
            true: 'unshift',
          }

          // `push` or `unshift` according to position option.
          // Space is at the opposite side.
          linkTokens[position[!opts.permalinkBefore]](space())
          state.tokens[idx + 1].children[position[opts.permalinkBefore]](...linkTokens)
        },
      })

    /**
      * Hyphenate a camelCase string.
    */
    const hyphenateRE = /\B([A-Z])/g
    const hyphenate = str => str.replace(hyphenateRE, '-$1').toLowerCase()

    const { attributes, body } = fm(text)
    const { title, subtitle } = attributes
    const description = md.render(`${title} ${subtitle}`)

    attributes.name = hyphenate(title)

    return {
      meta: attributes,
      description,
      api: md.render(body),
    }
  },
}
