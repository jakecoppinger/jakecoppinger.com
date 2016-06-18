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
var imageResize = require('gulp-image-resize');
var pipes = require('gulp-pipes');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');  



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

gulp.task('serve', ['fileinclude', 'browserSync', 'injectsass', 'resizeimages'], function() {
    gulp.watch(scssSource, ['injectsass']);
    gulp.watch(source + '**/*.html', ['fileinclude', reload]);
    gulp.watch(source + 'js/*.js', ['fileinclude', reload]);
});

var resizeImageTasks = [];
[1920, 720, 640].forEach(function(size) {
    var output = source + 'images/' + size + '/';
    var resizeImageTask = 'resize_' + size;
    gulp.task(resizeImageTask, function() {
        return gulp.src(source + 'original_images/**/*.{jpg,png,tiff}')
            .pipe(changed(output))
            .pipe(imageResize({
                format: 'jpeg',
                width: size,
                quality: 0.9,
                upscale: false
            }))
            .pipe(pipes.image.optimize())
            .pipe(gulp.dest(output))
    });
    resizeImageTasks.push(resizeImageTask);
});

gulp.task('resizeimages', resizeImageTasks);




// BUILDS //////////////////////////

gulp.task('styles', function() {
    return gulp.src(scssSource)
        .pipe(changed(scssSource, {
            extension: '.scss'

        }))
        .pipe(fileinclude({
            basepath: source + 'scss/templates/'
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

// JavaScript
var jsFiles = source + "js/**/*.js";  
var jsDest = build + "js";

gulp.task('js', function() {  
    return gulp.src(jsFiles)
        .pipe(gulp.dest(jsDest))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
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

    return merge(images,app,fonts,bower) // , thing1, thing2
        .pipe(size({
            title: 'copy'
        }));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('build', ['clean'], function(cb) {
    runSequence(
        ['js','fileinclude', 'styles', 'resizeimages'],['copy'],
        cb);
});
