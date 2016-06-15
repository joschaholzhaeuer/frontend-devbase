// Include Gulp
var gulp = require('gulp');

// Include Plugins
var jshint       = require('gulp-jshint');
var sass         = require('gulp-sass');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var htmlmin      = require('gulp-htmlmin');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var imagemin     = require('gulp-imagemin');
var autoprefixer = require('autoprefixer');
var pixrem       = require('pixrem');
var cssnano      = require('cssnano');
var browserSync  = require('browser-sync').create();


// Lint JS-Files
gulp.task('lint', function() {
    return gulp
        .src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp
        .src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Compile Sass
gulp.task('sass', function() {
    return gulp
        .src('src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Minify & Autoprefix CSS
gulp.task('css', function () {
    var processors = [
        pixrem(),
        autoprefixer({
            browsers: ['last 4 versions', 'android 4', 'opera 12']
        }),
        cssnano(),
    ];
    return gulp
        .src('dist/css/style.css')
        .pipe(postcss(processors))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist/css'));
});

// Minify HTML Files
gulp.task('minify', function() {
    return gulp
        .src('src/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// Compress Images
gulp.task('imagemin', function() {
    return gulp
        .src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    browserSync.init({
      proxy: 'frontend-devbase.dev/dist'
    });
    gulp.watch('src/js/*.js', ['lint', 'scripts']);
    gulp.watch('src/scss/**/*.scss', ['sass', 'css']);
    gulp.watch('src/*.html', ['minify']);
});

// Default Tasks
gulp.task('default', ['lint', 'sass', 'css', 'scripts', 'minify', 'imagemin', 'watch']);