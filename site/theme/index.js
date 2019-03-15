const path = require('path')
const layoutTmp = './template/Layout/index'
const homeTmp = './template/Home/index'
const contentTmp = './template/Content/index'

module.exports = {
  lazyLoad (nodePath, nodeValue) {
    if (typeof nodeValue === 'string') {
      return true
    }
    return nodePath.endsWith('/demo')
  },
  pick: {
    components(markdownData) {
      const { filename } = markdownData.meta
      if (!/^components/.test(filename) || /[/\\]demo$/.test(path.dirname(filename))) {
        return null
      }
      return {
        meta: markdownData.meta
      }
    },
  },
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-aok?injectProvider',
    'bisheng-plugin-pre-react?lang=__react'
  ],
  routes: {
    path: '/',
    component: './template/Layout/index',
    indexRoute: { component: homeTmp },
    childRoutes: [
      {
        path: 'index-cn',
        component: homeTmp,
      },
      {
        path: 'components/:children/',
        component: contentTmp,
      },
    ],
  },
};