const stylus = require('stylus')

const nodes = stylus.nodes

module.exports = function() {
  return function(style) {
    style.define('palette', function(color, index) {
      const colorStr = color.toString()
      const indexNum = index.toString()
      return
    }, true);
  };
};
