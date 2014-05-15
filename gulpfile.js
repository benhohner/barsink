// General
var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var filter = require('gulp-filter');
var size = require('gulp-size');

// Markup
var jade = require('gulp-jade');

// Styles
var stylus = require('gulp-stylus');
var autoprefix = require('gulp-autoprefixer');

// Scripts
var coffee = require('gulp-coffee');

// Images
var imagemin = require('gulp-imagemin');

// Server
var livereload = require('gulp-livereload');

// Paths
var path = {
  'src': {
    'coffee': './src/scripts/**/*.coffee',
    'stylus': './src/styles/**/*.styl',
    'img': './src/img/**/*',
    'jade': './src/markup/**/*.jade'
  },
  'build': {
    'js': './build/js',
    'css': './build/css',
    'img': './build/img',
    'root': './build'
  }
}

/**
 * Markup
 */
gulp.task('markup', function() {
  return gulp.src(path.src.jade)
    .pipe(watch())
    .pipe(plumber())
    .pipe(jade())
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(path.build.root));
});

/**
 * Styles Task
 */
gulp.task('styles', function() {
  return gulp.src(path.src.stylus)
    .pipe(watch())
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefix('last 2 versions', 'ie 8', 'ios 6', 'android 4'))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(path.build.css));
});

/**
 * Scripts Task
 */
gulp.task('scripts', function() {
  return gulp.src(path.src.coffee)
    .pipe(watch())
    .pipe(plumber())
    .pipe(coffee())
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(path.build.js));
});

/**
 * Images Task
 */
gulp.task('images', function() {
  var pngFilter = filter(path.src.img + '/*.png');
  var jpgFilter = filter(path.src.img + '/*.jpg');
  var gifFilter = filter(path.src.img + '/*.gif');

  return gulp.src(path.src.img)
    .pipe(watch())
    .pipe(plumber())

    .pipe(pngFilter)
    .pipe(imagemin())
    .pipe(pngFilter.restore())

    .pipe(jpgFilter)
    .pipe(imagemin())
    .pipe(jpgFilter.restore())

    .pipe(gifFilter)
    .pipe(imagemin())
    .pipe(gifFilter.restore())

    .pipe(size({ showFiles: true }))

    .pipe(gulp.dest(path.build.img));
});

/**
 * Watch Task
 */
gulp.task('watch', function() {
  function update(event) {
    console.log('File '+event.path+' was '+event.type+', running tasks...');
  }
  
  gulp.watch(path.src.coffee, ['scripts']).on('change', update);
  gulp.watch(path.src.styles, ['styles']).on('change', update);
  gulp.watch(path.src.img, ['images']).on('change', update);
  gulp.watch(path.src.jade, ['markup']).on('change', update);
});

  
/**
 * Serve Task
 */
gulp.task('serve', function(next) {
  var connect = require('connect'),
      server = connect(),
      port = process.env.PORT || 8080;

  server.use(connect.static(path.build.root)).listen(port , next);
  console.log('Now Serving files on port ' + port);
});

/**
 * Livereload Task
 */
gulp.task('livereload', ['serve'], function() {
  var server = livereload();
  gulp.watch(path.build.root + '/**').on('change', function(file) {
      console.log(file.path + ' Changed. Updating Livereload.');
      server.changed(file.path);
  });
});

/**
 * Clean Task (Blocking)
 */
gulp.task('clean', function() {
  return gulp.src(path.build.root + "/**/*", { read: false })
    .pipe(clean({ force: true }));
});

/**
 * Default Task
 */
gulp.task('default', ['markup', 'scripts', 'styles', 'images', 'watch', 'livereload']);

/**
 * Deploy Raw Task
 */
gulp.task('deploy-raw', ['clean', 'markup', 'styles', 'scripts', 'images']);