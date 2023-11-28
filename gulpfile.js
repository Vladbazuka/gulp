const { src, dest} = require('gulp');

const sass   = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;


function scripts() {
    return src('src/js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('build/js'))
}

function style () {
    return src('src/style/style.scss')
        .pipe(concat('style.min.css'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(dest('build/style'))
}

function html() {
    return src('src/index.html')
        .pipe(dest('build'))
}


exports.html = html;
exports.style = style;
exports.scripts = scripts;