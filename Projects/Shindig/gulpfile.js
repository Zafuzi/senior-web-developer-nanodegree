var gulp = require('gulp'),
  react = require('react'),
  react_dom = require('react-dom'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  autoprefixer = require('gulp-autoprefixer'),
  babel = require('gulp-babel'),
  browserSync = require('browser-sync').create(),
  eslint = require('gulp-eslint'),
  filter = require('gulp-filter'),
  newer = require('gulp-newer'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  reload = browserSync.reload,
  sass = require('gulp-sass'),
  watch = require('gulp-watch'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  htmlmin = require('gulp-htmlmin');


var onError = function(err) {
  notify.onError({
    title: "Error",
    message: "<%= error %>",
  })(err);
  this.emit('end');
};

var plumberOptions = {
  errorHandler: onError,
};

var jsFiles = {
  vendor: [

  ],
  source: [
    'src/assets/js/src/components/*.jsx',
    'src/assets/js/src/jquery.min.js',
    'src/assets/js/src/main.js'
  ]
};

// Lint JS/JSX files
gulp.task('eslint', function() {
  return gulp.src(jsFiles.source)
    .pipe(eslint({
      "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true
        },
        "ignore": '*.min.js'
      },
      "rules": {
        "semi": 2
      }
    }))
    .pipe(eslint.format())
    .on('data', function(file) {
      if (file.eslint.messages && file.eslint.messages.length) {
        gulp.fail = true;
      }
    });
});
process.on('exit', function() {
  if (gulp.fail) {
    process.exit(1);
  }
});

// Copy react.js and react-dom.js to assets/js/src/vendor
// only if the copy in node_modules is "newer"
gulp.task('copy-react', function() {
  return gulp.src('node_modules/react/dist/react.min.js')
    .pipe(newer('src/assets/js/src/vendor/react.js'))
    .pipe(gulp.dest('src/assets/js/src/vendor'));
});
gulp.task('copy-react-dom', function() {
  return gulp.src('node_modules/react-dom/dist/react-dom.min.js')
    .pipe(newer('src/assets/js/src/vendor/react-dom.js'))
    .pipe(gulp.dest('src/assets/js/src/vendor'));
});

// Copy assets/js/vendor/* to assets/js
gulp.task('copy-js-vendor', function() {
  return gulp
    .src([
      'src/assets/js/src/vendor/react.js',
      'src/assets/js/src/vendor/react-dom.js'
    ])
    .pipe(gulp.dest('dist/assets/js'));
});

// Concatenate jsFiles.vendor and jsFiles.source into one JS file.
// Run copy-react and eslint before concatenating
gulp.task('concat', ['eslint', 'copy-react', 'copy-react-dom'], function() {
  return gulp.src(jsFiles.vendor.concat(jsFiles.source))
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(babel({
      presets: ['react'],
      only: [
        'src/assets/js/src/components',
        'src/assets/js/src/*.js'
      ],
      compact: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/assets/js'));
});

// Compile Sass to CSS
gulp.task('sass', function() {
  var autoprefixerOptions = {
    browsers: ['last 3 versions'],
  };

  var filterOptions = '**/*.css';

  var reloadOptions = {
    stream: true,
  };
  var sassOptions = {
    includePaths: [

    ]
  };

  return gulp.src(['src/assets/sass/skeleton.scss', 'src/assets/sass/colors.scss', 'src/assets/sass/base.scss'])
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/assets/css/src'))
    .pipe(filter(filterOptions))
    .pipe(reload(reloadOptions));
});


// Watch JS/JSX and Sass files
gulp.task('watch', function() {
  gulp.watch('src/assets/js/src/components/*.jsx', ['concat']);
  gulp.watch('src/assets/js/src/*.js', ['concat']);
  gulp.watch('src/assets/sass/**/*.scss', ['sass', 'clean-css']);
  gulp.watch('src/*.html', ['html']);
});

gulp.task('clean-css', function() {
  return gulp.src('dist/assets/css/src/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie9'
    }))
    .pipe(gulp.dest('dist/assets/css/'));
});

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'));
});

// BrowserSync
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    open: false,
    online: false,
    notify: false,
  });
});

gulp.task('build', ['html', 'sass', 'concat', 'copy-js-vendor']);
gulp.task('default', ['build', 'browser-sync', 'watch']);
