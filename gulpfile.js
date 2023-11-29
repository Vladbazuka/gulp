const { src, dest, watch, parallel} = require('gulp');

const sass   = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');


function scripts() {
    return src(['src/js/main.js',
    'node_modules/swiper/swiper-bundle.js',
])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('build/js'))
        .pipe(browserSync.stream())
}

function style () {
    return src('src/style/style.scss')
        .pipe (autoprefixer({overrideBrowserslist:['last 10 version']}))
        .pipe(concat('style.min.css'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(dest('build/style'))
        .pipe(browserSync.stream())
}

function html() {
    return src('src/index.html')
        .pipe(dest('build'))
}
function watching() {
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
    watch(['src/style/style.scss'], style)
    watch(['src/js/main.js'], scripts)
    watch(['src/*html']).on('change', browserSync.reload);
} 

function build(){
    return src([
        'build/style/style.min.css',
        'build/js/main.min.js',
        'src/**/*.html'
    ], {base : 'src'})
    .pipe(dest('dist'))
    }
exports.html = html;
exports.style = style;
exports.scripts = scripts;
exports.watching = watching;
exports.build = build;

exports.default =  parallel(html, style, scripts, watching);