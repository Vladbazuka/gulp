const { src, dest} = require('gulp');

const sass = require('gulp-sass')(require('sass'));


function style () {
    return src('src/style/style.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(dest('build/style'))
}

function html() {
    return src('src/index.html')
        .pipe(dest('build'))
}


exports.html = html;
exports.style = style;