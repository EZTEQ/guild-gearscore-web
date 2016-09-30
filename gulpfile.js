const gulp = require('gulp');
const connect = require('gulp-connect');
const useref = require('gulp-useref');

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
    gulp.watch('src/**', ['concat']);
});

gulp.task('serve', ['concat', 'webserver', 'watch']);
gulp.task('default', ['concat']);
