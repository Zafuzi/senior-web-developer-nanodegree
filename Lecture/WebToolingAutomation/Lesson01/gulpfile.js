var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  include = require("gulp-include");

gulp.task('styles', function() {
  gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task("scripts", function() {
  console.log("-- gulp is running task 'scripts'");
  gulp.src("src/js/**/*.js")
    .pipe(include())
    .on('error', console.log)
    .pipe(gulp.dest("dist/js"));
});

gulp.task('live', function() {
  gulp.watch('src/js/**/*.js', ["scripts"]);
  gulp.watch('src/sass/**/*.scss', ["styles"]);
});

gulp.task("default", ["styles", "scripts"]);
