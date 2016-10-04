const gulp = require('gulp');
const connect = require('gulp-connect');
const useref = require('gulp-useref');
const rimraf = require('rimraf');

gulp.task('concat', () => {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

gulp.task('watch', () => {
    gulp.watch('src/**', ['default']);
});

gulp.task('clean', (cb) => {
    rimraf('./dist/*', cb);
})

gulp.task('serve', ['concat', 'webserver', 'watch']);
gulp.task('default', ['clean', 'concat']);
