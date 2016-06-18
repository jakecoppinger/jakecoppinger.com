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
var gulpFileInclude = require('gulp-file-include');
var rename = require('gulp-rename');

var reload = browserSync.reload;

var source = "source/"
var build = "dist/"
var scssSource = source + "scss/**/*.scss"
var templates = source + "templates";


// TEMPLATES ///////////////////////

// fileinclude: grab partials from templates and render out html files
// ==========================================
gulp.task('fileinclude', function() {
    return gulp.src(source + '**/*.tpl.html')
        .pipe(fileinclude())
        .pipe(rename({
            extname: ""
        }))
        .pipe(rename({
            extname: ".html"
        }))
        .pipe(gulp.dest(source))
});

gulp.task('injectsass', function() {
    return gulp.src(scssSource)
        .pipe(fileinclude({
            basepath: source + 'scss/templates/'
        }))
        .pipe(sass().on('error', sass.logError))

        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))


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

gulp.task('serve', ['fileinclude', 'browserSync', 'injectsass'], function() {
    gulp.watch(scssSource, ['injectsass']);
    gulp.watch(source + '**/*.html', ['fileinclude', reload]);
    gulp.watch(source + 'js/*.js', ['fileinclude', reload]);
});

// BUILDS //////////////////////////

gulp.task('styles', function() {
    return gulp.src(scssSource)
        .pipe(changed(scssSource, {
            extension: '.scss'
      
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
        source + '**/*.html',
        '!' + source + '**/*.tpl.html'
        // We don't want to copy templates
    ], {
        dot: true
    }).pipe(gulp.dest(build));


    return merge(app) // , thing1, thing2
        .pipe(size({
            title: 'copy'
        }));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('build', ['clean'], function(cb) {
    runSequence(
        ['fileinclude', 'copy', 'styles'],
        cb);
});
