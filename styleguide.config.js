const path = require('path');
const glob = require('glob');

module.exports = {
  title: 'React Style Guide Example',
  components: function () {
    return glob.sync(path.resolve(__dirname, './components/**/*.tsx'))
      .filter(function (module) {
        return /index.tsx$/.test(module);
      });
  },
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  propsParser: require('react-docgen-typescript').withDefaultConfig({
    propFilter: {
      skipPropsWithoutDoc: true
    }
  }).parse,
  getExampleFilename(componentPath) {
    console.info(componentPath)
    const demoStr = 'demo'
    let componentPath = componentPath.split('/')
    return componentPath.replace(/\[A-Z].tsx?$/, '.md')
  },
};