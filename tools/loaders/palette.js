const stylus = require('stylus')

module.exports = function() {
  return function(style) {
    style.define('palette', function(color, index) {
      const colorStr = color.toString()
      const indexNum = index.toString()
      return
    }, true);
  };
};
