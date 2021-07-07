var gulp = require('gulp')
var sass = require('gulp-sass')(require('sass'))
var cleanCss = require('gulp-clean-css')
var sopurcemaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync').create()
var imagemin = require('gulp-imagemin')


gulp.task('sass', function () {
    return gulp.src('src/css/app.scss')
        .pipe(sopurcemaps.init())
        .pipe(sass())
        .pipe(
            cleanCss({
                compatibility: 'ie8'
            })
        )
        .pipe(sopurcemaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream())
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('images', function () {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
})

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
})

gulp.task('watch', function () {

    browserSync.init({
        server: {
            baseDir: "dist"
        }
    })

    gulp.watch('src/*.html', ['html']).on('change', browserSync.reload)
    gulp.watch('src/css/app.scss', ['sass'])
    gulp.watch('src/fonts/*'['fonts'])
    gulp.watch('src/img/*'['img'])
})

gulp.task('default', ['html', 'sass', 'fonts', 'images', 'watch']);