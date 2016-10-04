const gulp = require('gulp');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const browserify = require('browserify');
const stringify = require('stringify');
const source = require('vinyl-source-stream');
const rimraf = require('rimraf');

const srcDir = './src';
const distDir = './dist';

gulp.task('clean', (cb) => {
    rimraf(distDir + '/*', cb);
});

gulp.task('browserify', ['clean'], () => {
    return browserify({
            entries: srcDir + '/js/app.js'
        })
        .transform(stringify, {
            appliesTo: { includeExtensions: ['.html'] }
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(distDir + '/js/'));
});

gulp.task('bundle-js', ['clean'], function() {
    return gulp.src('node_modules/semantic-ui-css/semantic.min.js')
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(distDir + '/js'));
});

gulp.task('bundle-css', ['clean'], function() {
    return gulp.src([
            srcDir + '/css/**/*.css',
            'node_modules/semantic-ui-css/semantic.min.css'
        ])
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(distDir + '/css'));
});

gulp.task('copy-index-html', ['clean'], () => {
    gulp.src(srcDir + '/index.html')
        .pipe(gulp.dest(distDir));
});

gulp.task('copy-css', () => {
    gulp.src(srcDir + '/css/**/*.css')
        .pipe(gulp.dest(distDir + '/css'));
});

gulp.task('build', ['clean', 'copy-index-html', 'bundle-css', 'bundle-js', 'browserify'])
gulp.task('default', ['build']);
