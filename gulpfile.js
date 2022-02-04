const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const browerSync = require('browser-sync').create();
const minify = require('gulp-minify');

// compile scss into css
function style() {

    // 1. where is my scss file
    return gulp.src('./src/scss/**/*.scss')

        // rename css compressed file to style.min.css
        .pipe(rename({ suffix: '.min' }))
        // 2. pass that file through sass compiler
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))

        // 3. where do I save the compiled CSS?
        .pipe(gulp.dest('./dist/css'))

        // 4. stream changes to all browser
        .pipe(browerSync.stream());
}

function commonJs() {
    return gulp.src(['./src/js/*.js', './src/js/*.mjs'])
        .pipe(minify())
        .pipe(gulp.dest('./dist/js'))
}

function watch() {
    browerSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./src/scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browerSync.reload);
    gulp.watch('./src/js/**/*.js').on('change', browerSync.reload);
}

exports.commonJs = commonJs;
exports.style = style;
exports.watch = watch;