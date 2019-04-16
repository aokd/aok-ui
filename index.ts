const requireWithContext = require.context('./components', true, /^\.\/[^_][\w-]+\/style\/index\.tsx$/)

requireWithContext.keys().forEach((path) => {
  let mod = requireWithContext(path)
  if (mod && mod.default) {
    mod = mod.default
  }
  const match = path.match(/^\.\/([^_][\w-]+)\/index\.tsx?$/)
  if (match) {
    exports[`${match[1]}`] = mod
  }
})

module.exports = require('./components')
