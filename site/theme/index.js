const path = require('path');

module.exports = {
  lazyLoad: false,
  pick: {
    components(markdownData) {
      const { filename } = markdownData.meta;
      if (!/^components/.test(filename) || /[/\\]demo$/.test(path.dirname(filename))) {
        return null;
      }
      return {
        meta: markdownData.meta,
      };
    },
  },
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-react?lang=__react'
  ],
  routes: [{
    path: '/',
    component: './template/Archive.tsx',
  }],
};