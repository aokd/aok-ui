const inquirer = require('inquirer')
const fs = require('fs')
const ejs = require('ejs')
const cwd = require('../utils/cwd')

function genComponents (title, subtitle, scenario, clsprefix) {
  this.title = title
  this.subtitle = subtitle
  this.scenario = scenario
  this.clsprefix = clsprefix
}

genComponents.prototype = {
  mkdir: function (dir) {
    try {
      fs.mkdirSync(dir, { recursive: true })
      return this
    } catch (err) {
      if (err.message.includes(`file already exists`)) {
        console.error(`components already exists`)
      }
      return this
    }
  },
  render: function (template, filename) {
    const { title, subtitle, scenario, clsprefix } = this
    ejs.renderFile(template, { title, subtitle, scenario, clsprefix }, {}, (err, str) => {
      fs.writeFileSync(filename, str)
    })
    return this
  },
  copy: function (template, dist) {
    fs.copyFileSync(template, dist)
    return this
  },
  append: function (path, data) {
    fs.appendFileSync(path, data)
    return this
  },
  walk: function (path) {
    const { title, subtitle, scenario, clsprefix } = this
    const list = fs.readdirSync(path)

    list.forEach((fragment) => {
      const subPath = path + '/' + fragment
      const distPath = subPath.replace(/tools\/gen\/template/, `components/${title}`).replace(/\.ejs$/, '')
      const stats = fs.statSync(subPath)
      if (stats.isDirectory()) {
        this.mkdir(distPath)
        return this.walk(subPath)
      } else if (stats.isFile()) {
        const isEjs = subPath.includes('.ejs')
        if (!isEjs) {
          this.copy(subPath, distPath)
        } else {
          this.render(subPath, distPath)
        }
      }
    })
    return this
  }
}

inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: "What's your component name?"
    },
    {
      type: 'input',
      name: 'subtitle',
      message: "What's your component subtitle?"
    },
    {
      type: 'input',
      name: 'scenario',
      message: "What's the component's usage scenario?"
    },
    {
      type: 'input', 
      name: 'clsprefix',
      message: "What's the component's class prefix?"
    },
    {
      type: 'confirm',
      name: 'yaml',
      message: "Do you need to change the route yaml config?"
    }
  ])
  .then((options) => {
    const { title, subtitle, scenario, clsprefix, yaml } = options
    const componentName = title.replace(/^[\w]{1}/, ($1) => $1.toUpperCase())

    const templateDir = cwd('tools', 'gen', 'template')
    const componentIndex = cwd('components', 'index.ts')
    const yamlPath = cwd('site', 'routes', 'config.yaml')
    const appendComponentIndexData = `export { default as ${componentName} } from './${title}'\n`
    const appendYamlData = 
   `    -
          title: ${componentName}
          subTitle: ${subtitle}
          path: ${title}
          componentName: ${componentName}
   `

    const next = new genComponents(title, subtitle, scenario, clsprefix)
      .walk(templateDir)
      .append(componentIndex, appendComponentIndexData)
    yaml && next.append(yamlPath, appendYamlData)
    console.info(`✨✨ generate ${title} successfully !`)
  })
  