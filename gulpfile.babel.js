const gulp = require('gulp')
const pug = require('gulp-pug')
const browserSync = require('browser-sync')  
const sass = require('gulp-sass') 
const postcss = require('gulp-postcss') 
const cssnano = require('cssnano') 
const babelify = require('babelify') 
const browserify = require('browserify') 
const buffer = require('vinyl-buffer') 
const source = require('vinyl-source-stream') 

const server = browserSync.create()

const postCSSPlugin = [
  cssnano({
    autoprefixer: {
      add: true
    }
  })
]

gulp.task('js', () => {
  return browserify({
    entries: ['dev/js/index.js'],
    transform: [babelify]
  }).bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulp.dest('public/js/'))
})

gulp.task('sass', () =>
  gulp.src('./dev/scss/styles.scss')
    .pipe(sass())
    .pipe(postcss(postCSSPlugin))
    .pipe(gulp.dest('./public/css/'))
    .pipe(server.stream({
      match: '**/*.css' })) // para que se recarge en tiempo real
)

gulp.task('pug', () =>
  gulp.src('./dev/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./public/'))
)

gulp.task('default', () => {
  server.init({
    server: {
      baseDir: './public'
    }
  })
  gulp.watch('./dev/js/*.js', ['js', server.reload])
  gulp.watch('./dev/pug/**/*.pug', ['pug', server.reload])
  gulp.watch('./dev/scss/**/*.scss', ['sass'])
})
