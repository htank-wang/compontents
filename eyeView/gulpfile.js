const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const watch = require('gulp-watch');
// import less from 'gulp-less';
//
// const paths = {
//     less: 'less/',
//     dest: 'build/'
// };
//
// gulp.task('less', () => {
//     gulp.src(`${paths.less}**/*.less`)
//         .pipe(less())
//         .pipe(gulp.dest(`${paths.dest}css/`));
// });

const paths = {
    js: 'src/',
    dist: 'dist/'
}

gulp.task('_build_js', () => {
    gulp.src(`${paths.js}**/*.js`)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(`${paths.dist}src/`));
})

gulp.task('build_dev', () => {
    return watch(`${paths.js}**/*.js`, () => {
        gulp.run('_build_js')
    })
})

gulp.task('build_prd', () => {
    gulp.src(`${paths.js}**/*.js`)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(`${paths.dist}src/`));
})


