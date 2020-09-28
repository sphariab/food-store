var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

gulp.task('js', function(){
    gulp.src('./js/main.js')
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: "./",
        notify: false
    });
});

gulp.task('sass', function() {
    return gulp.src('./css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', function() {
    gulp.watch('./css/**/*.scss', gulp.series('sass'));
    gulp.watch('./js/*.js', gulp.series('js'));
});

gulp.task('default', gulp.parallel('watch', 'browser-sync'));
