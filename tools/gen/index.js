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
      fs.mkdirSync(dir)
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
    },{
      type: 'input', 
      name: 'clsprefix',
      message: "What's the component's class prefix?"
    }
  ])
  .then((options) => {
    const { title, subtitle, scenario, clsprefix } = options
    const prefix = `components/` + title
    const templatePrefix = `tools/gen/template`

    const dist = cwd(prefix)
  
    const componentFile         = cwd(prefix, `${title}.tsx`)
    const componentFileEjs      = cwd(templatePrefix, `component.tsx.ejs`)
    const componentIndex        = cwd(prefix, `index.tsx`)
    const componentIndexEjs     = cwd(templatePrefix, `index.tsx.ejs`)
    const componentIndexMd      = cwd(prefix, `index.zh-CN.md`)
    const componentIndexMdEjs   = cwd(templatePrefix, `index.zh-CN.md.ejs`)
  
    const testsDir              = cwd(prefix, `__tests__`)
    const testsIndex            = cwd(prefix, `__tests__`, `index.test.tsx`)
    const testsIndexEjs         = cwd(templatePrefix, `__tests__`, `index.test.tsx.ejs`)

    const demoDir               = cwd(prefix, `demo`)
    const demoBasicMd           = cwd(prefix, `demo`, `basic.md`)
    const demoBasicMdEjs        = cwd(templatePrefix, `demo`, `basic.md.ejs`)

    const styleDir              = cwd(prefix, `style`)
    const styleIndexTsx         = cwd(prefix, `style`, `index.tsx`)
    const styleIndexTsxTemplate = cwd(templatePrefix, `style`, `index.tsx`)
    const styleIndexStyl        = cwd(prefix, `style`, `index.styl`)
    const styleIndexStylEjs     = cwd(templatePrefix, `style`, `index.styl.ejs`)

    const genInstance = new genComponents(title, subtitle, scenario, clsprefix)
    genInstance
      .mkdir(dist)
      .render(componentFileEjs, componentFile)
      .render(componentIndexEjs, componentIndex)
      .render(componentIndexMdEjs, componentIndexMd)
      .mkdir(testsDir)
      .render(testsIndexEjs, testsIndex)
      .mkdir(demoDir)
      .render(demoBasicMdEjs, demoBasicMd)
      .mkdir(styleDir)
      .copy(styleIndexTsxTemplate, styleIndexTsx)
      .render(styleIndexStylEjs, styleIndexStyl)
  })
  