const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const globby = require('globby')
const chokidar = require('chokidar')
const cwd= require('./cwd')
const { isProd } = require('./env')

const templates = {}

const update = function (file) {
  if (!fs.lstatSync(file).isFile()) return

  const name = path.basename(file, '.tsx.ejs')
  const content = fs.readFileSync(file, 'utf-8')
  const template = ejs.compile(content, {
    escape: i => i
  })

  templates[name] = (data) => {
    return template(data)
  }
}

const paths = globby.sync(cwd('tools', 'templates', '**/*'))

paths.forEach(update)

if (!isProd) {
  const watcher = chokidar.watch(paths)
  watcher.on('add', update)
  watcher.on('update', update)
}

module.exports = (name) => templates[name] || (t => t)