const yaml = require('js-yaml')

module.exports = function (source) {
  this.cacheable && this.cacheable()
  try {
    var res = yaml.safeLoad(source)
    return 'module.exports=' + JSON.stringify(res, undefined, '\t')
  }
  catch (err) {
    this.emitError(err)
    return null
  }
}