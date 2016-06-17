"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var fileinclude = require('gulp-file-include');
var del = require('del');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var size = require('gulp-size');
var cleanCSS = require('gulp-clean-css');
var changed = require('gulp-changed');
var autoprefixer = require('gulp-autoprefixer');

var source = "source/"
var build = "dist/"
var scssSource = source + "scss/**/*.scss"

gulp.task('injectsass', function() {
    return gulp.src(scssSource)
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest(source + "css"))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: source
        },
        open: false,
        // notify: false,
        logPrefix: 'JakeCoppinger.com'
    })
})

gulp.task('serve', ['browserSync', 'injectsass'], function() {
    gulp.watch(scssSource, ['injectsass']);
});

// BUILDS//////////////////////////

gulp.task('styles', function() {

    return gulp.src(scssSource)
        .pipe(changed(scssSource, {
            extension: '.css'
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.tmp/scss'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))

    .pipe(cleanCSS({ debug: true }, function(details) {
        console.log(details.name + ': ' + details.stats.originalSize);
        console.log(details.name + ': ' + details.stats.minifiedSize);
    }))

    .pipe(gulp.dest(build + "css"))
        .pipe(size({
            title: "Minified styles in .tmp/scss & imported"
        }));
});

gulp.task('copy', function() {
    var app = gulp.src([
        source + '/*',
    ], {
        dot: true
    }).pipe(gulp.dest(build));

    return merge(app) // , adfadf, sfadf
        .pipe(size({
            title: 'copy'
        }));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('build', ['clean'], function(cb) {
    runSequence(
        ['copy', 'styles'],
        cb);
});
