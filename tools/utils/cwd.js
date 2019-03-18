const path = require('path')

module.exports = function cwd (...dir) {
  return path.resolve(__dirname, '../', '../', ...dir)
}
