const gulp = require('gulp');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const browserify = require('browserify');
const stringify = require('stringify');
const source = require('vinyl-source-stream');
const rimraf = require('rimraf');

const srcDir = './src';
const distDir = './dist';

gulp.task('connect', () => {
    connect.server({
        root: distDir,
        port: 8080,
        livereload: true
    });
});

gulp.task('watch', () => {
    gulp.watch([srcDir + '/**/*.*'], ['build']);
});

gulp.task('clean', (cb) => {
    rimraf(distDir + '/*', cb);
});

gulp.task('bundle-js', () => {
    return browserify({
            entries: srcDir + '/js/app.js'
        })
        .add('node_modules/semantic-ui-css/semantic.min.js')
        .transform(stringify, {
            appliesTo: { includeExtensions: ['.html'] }
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(distDir + '/js/'))
        .pipe(connect.reload());
});

gulp.task('bundle-css', function() {
    return gulp.src([
            srcDir + '/css/**/*.css',
            'node_modules/semantic-ui-css/semantic.min.css'
        ])
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(distDir + '/css'))
        .pipe(connect.reload());
});

gulp.task('copy-index-html', () => {
    gulp.src(srcDir + '/index.html')
        .pipe(gulp.dest(distDir))
        .pipe(connect.reload());
});

gulp.task('bundle', ['bundle-css', 'bundle-js']);
gulp.task('build', ['copy-index-html', 'bundle']);
gulp.task('serve', ['build', 'connect', 'watch']);
gulp.task('default', ['build']);
