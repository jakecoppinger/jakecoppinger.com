"use strict";
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var del = require('del');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
//var size = require('gulp-size');

var reload = browserSync.reload;

var source = "source/"
var build = "dist/"
var scssSource = source + "scss/**/*.scss"

require('require-dir')('./gulp-tasks');

gulp.task('pipesass', ['sass'], function() {
    return gulp.src(source + 'css/scripts.min.css')
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
        notify: false,
        logPrefix: 'JakeCoppinger.com'
    })
})

gulp.task('serve', function(callback) {
    //'resizeimages',
    runSequence(
        ['uglifyjs', 'html', 'sass'], ['concatjs'], ['browserSync'],
        callback);

    gulp.watch(scssSource, ['pipesass']);
    gulp.watch([
        source + 'pages/**/*.html',
        source + 'templates/**/*.{njk,md}'
    ], ['html', reload]);

    gulp.watch([
        source + 'data.json'
    ], ['html', reload]);

    gulp.watch(source + 'js/*.js', ['uglifyjs', 'concatjs']);
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('build', ['clean'], function(callback) {
    runSequence(
        ['images', 'uglifyjs', 'html', 'sass'], ['concatjs'], ['copy'],
        callback);
});

gulp.task('copy', function() {
    var html = gulp.src([
        source + '**/*.html',
        '!' + source + '**/*.tpl.html'
        // We don't want to copy templates
    ], {
        dot: true
    }).pipe(gulp.dest(build));

    var fonts = gulp.src([
        source + 'fonts/**/*.*'
    ], {
        dot: true
    }).pipe(gulp.dest(build + 'fonts/'));

    var images = gulp.src([
        source + 'images/**/*.*'
    ], {
        dot: true
    }).pipe(gulp.dest(build + 'images/'));

    var sass = gulp.src([
        source + 'css/style.min.css'
    ], {
        dot: true
    }).pipe(gulp.dest(build + 'css/'));

    var js = gulp.src([
        source + 'js/scripts.min.js'
    ], {
        dot: true
    }).pipe(gulp.dest(build + 'css/'));

    return merge(images, html, fonts, sass)
        .pipe(size({
            title: 'copy'
        }));
});
