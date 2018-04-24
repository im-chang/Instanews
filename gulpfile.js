var gulp = require('gulp'),
uglify = require("gulp-uglify"),
rename = require("gulp-rename"),
browserSync = require("browser-sync"),
eslint = require("gulp-eslint");

gulp.task('lint', function() {
    return gulp.src(['**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("scripts", gulp.series("lint", function() {
    return gulp
    .src('./js/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js"}))
    .pipe(gulp.dest("./build/js"));
}));

gulp.task('watch', function(done) {
    gulp.watch('js/*.js', gulp.series('scripts'));
    done();
});

gulp.task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    
    gulp.watch(["build/js/*.js", "style.css"])
    .on('change', browserSync.reload);
});

gulp.task("default", gulp.parallel("browser-sync", "watch"));



