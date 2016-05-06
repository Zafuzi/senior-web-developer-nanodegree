var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  include = require('gulp-include'),
  eslint = require('gulp-eslint');


gulp.task("pages", function() {
  console.log('-- gulp is running task "pages"');
  gulp.src('src/html/**/*.html')
    .pipe(include())
    .on('error', console.log)
    .pipe(gulp.dest('dist/html'));
});

gulp.task('styles', function() {
  console.log('-- gulp is running task "styles"');
  gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task("scripts", function() {
  console.log('-- gulp is running task "scripts"');
  gulp.src('src/js/**/*.js')
    .pipe(include())
    .on('error', console.log)
    .pipe(gulp.dest('dist/js'));
});

gulp.task("images", function() {
  console.log('-- gulp is running task "images"');
  gulp.src('src/images/**')
    .pipe(include())
    .on('error', console.log)
    .pipe(gulp.dest('dist/images'));
});

gulp.task('lint', function() {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('live', function() {
  gulp.watch('src/js/**/*.js', ['scripts', 'lint']);
  gulp.watch('src/sass/**/*.scss', ['styles']);
  gulp.watch('src/html/**/*.html', ['pages']);
  gulp.watch('src/images/**', ['images']);
});

gulp.task('default', ['pages', 'styles', 'scripts', 'lint', 'live']);
