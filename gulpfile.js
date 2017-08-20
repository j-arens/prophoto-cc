// utils
const gulp = require('gulp');
const bsync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const newer = require('gulp-newer');

// js
const webpack = require('webpack-stream');

// css
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const nano = require('gulp-cssnano');

/**
 * Styles
 */
gulp.task('styles', () => gulp.src('./Assets/styles/source/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(nano({ zindex: false, reduceIdents: false }))
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./Assets/styles'))
);

/**
 * JS
 */
gulp.task('js', () => gulp.src('./Assets/js/source/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./Assets/js'))
);

/**
 * Bsync
 */
gulp.task('bsync', () => bsync.init({proxy: 'localhost', reloadDelay: 2500}));
gulp.task('reload', () => bsync.reload());

/**
 * Migrate
 */

 gulp.task('migrate-dev', () => gulp.src('./**/*')
    .pipe(newer('/var/www/html/wp-content/plugins/prophoto-cc'))
    .pipe(gulp.dest('/var/www/html/wp-content/plugins/prophoto-cc'))
);

/**
 * Watch
 */
gulp.task('watch', () => {
    gulp.watch('./Assets/styles/source/**/*.scss', ['styles']);
    gulp.watch('./Assets/js/source/**/*.js', ['js']);
});

gulp.task('watch-dev', () => {
    gulp.watch(['./**/*.php', './**/*.svg', './Assets/js/app.bundle.js', './Assets/styles/style.min.css'], ['migrate-dev', 'reload']);
});

/**
 * Tasks
 */
gulp.task('build', ['styles', 'js']);
gulp.task('build-watch', ['build', 'watch']);
gulp.task('dev', ['build-watch', 'bsync', 'watch-dev']);
gulp.task('default', ['dev']);