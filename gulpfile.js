"use strict";
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var del = require('del');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var size = require('gulp-size');
var reload = browserSync.reload;

var source = "source/"
var build = "dist/"
var scssSource = source + "scss/**/*.scss"

require('require-dir')('./gulp-tasks');

gulp.task('pipesass', ['sass'], function() {
    return gulp.src(source + 'css')
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

gulp.task('serve', ['html', 'browserSync', 'sass', 'resizeimages'], function() {
    gulp.watch(scssSource, ['pipesass']);
    gulp.watch([source + '**/*.html', source + 'content/**/*.md', ], ['html', reload]);
    gulp.watch(source + 'js/*.js', ['html', reload]);
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('build', ['clean'], function(cb) {
    runSequence(
        ['js', 'html', 'sass', 'resizeimages'], ['copy'],
        cb);
});

gulp.task('copy', function() {
    var app = gulp.src([
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

    var bower = gulp.src([
        source + 'components/**/*.*'
    ], {
        dot: true
    }).pipe(gulp.dest(build + 'components/'));

    var images = gulp.src([
        source + 'images/**/*.*'
    ], {
        dot: true
    }).pipe(gulp.dest(build + 'images/'));

    var sass = gulp.src([
        source + 'css/**/*.*'
    ], {
        dot: true
    }).pipe(gulp.dest(build + 'css/'));


    return merge(images, app, fonts, bower, sass)
        .pipe(size({
            title: 'copy'
        }));
});
