const fs = require('fs')
const gulp = require('gulp')
const path = require('path')
const rimraf = require('rimraf')
const stylus = require('stylus')
const postcss = require('postcss')
const through2 = require('through2')
const tsc = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')

const cwd = require('./tools/utils/cwd')
const postcssConfig = require('./postcss.config.js')
const getTsCompileConfig = require('./tools/components/getTsCompileConfig')

function transformStylus (stylusFile) {
  const resolvedStylusFile = path.resolve(cwd, stylusFile)

  let data = fs.readFileSync(resolvedStylusFile, 'utf-8')
  data = data.replace(/^\uFEFF/, '')

  return new Promise((resolve, reject) => {
    stylus(data)
      .set('filename', `${resolvedStylusFile}.css`)
      .render((err, css) => {
        if (err) {
          reject(err)
        }
        resolve(css)
      })
  })
    .then(res => postcss(postcssConfig.plugins).process(res, { from: undefined }))
    .then(res => res.css)
}
/* eslint-disable func-names */
function compile (outputPath) {
  rimraf.sync(cwd(outputPath))
  gulp
    .src('components/**/*.styl')
    .pipe(
      through2.obj(function (chunk, encoding, next) {
        this.push(chunk.clone())
        if (chunk.path.match(/(\/|\\)style(\/|\\)index\.styl/)) {
          transformStylus(chunk.path)
            .then((css) => {
              chunk.contents = Buffer.from(css)
              chunk.path = chunk.path.replace(/.styl$/, '.css')
              this.push(chunk)
              next()
            })
            .catch(console.error)
        } else {
          next()
        }
      }),
    )
    .pipe(gulp.dest(outputPath))

  const source = ['components/**/*.ts', 'components/**/*.tsx']
  const tsCompileConfig = getTsCompileConfig()
  gulp
    .src(source)
    .pipe(sourcemaps.init())
    .pipe(tsc(tsCompileConfig))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(outputPath))
}

gulp.task('compile', (done) => {
  console.log('[Parallel] Compile single components...')
  compile('lib')
  done()
})
