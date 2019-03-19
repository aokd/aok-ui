const yaml = require('js-yaml')

module.exports = function yamlLoader (source) {
  this.cacheable && this.cacheable()
  try {
    const res = yaml.safeLoad(source)
    return `module.exports=${JSON.stringify(res, undefined, '\t')}`
  } catch (err) {
    this.emitError(err)
    return null
  }
}
