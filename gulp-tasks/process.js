"use strict";
var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var changed = require('gulp-changed');

var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
//var markdown = require('markdown');
var pipes = require('gulp-pipes');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');
var concat = require('gulp-concat');

var source = "source/";
var build = "dist/"
var scssSource = source + "scss/**/*.scss";

// Sass
gulp.task('sass', function() {
    return gulp.src(scssSource)
        .pipe(changed(scssSource, {
            extension: '.scss'
        }))
        .pipe(fileinclude({
            basepath: source + 'scss/templates/'
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.tmp/scss'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(sourcemaps.init())
        .pipe(concatCss("style.min.css"))
                .pipe(cleanCSS({ debug: true }, function(details) {
            var originalSize = (details.stats.originalSize / 1024).toFixed(2)
            var compressedSize = (details.stats.minifiedSize / 1024).toFixed(2)
            console.log(details.name + " original: " + originalSize + "kb, compressed: " + compressedSize + "kb, ratio: " + (compressedSize / originalSize * 100).toFixed(1) + "%");
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(source + "css"))
});

// JavaScript
gulp.task('uglifyjs', function() {
    return gulp.src([
            source + 'js/*.js',
            "!" + source + 'js/*.min.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename({
            extname: ""
        }))
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(gulp.dest(source + "js"));
});

gulp.task('concatjs', function() {
    return gulp.src([
            source + 'js/components/jquery/dist/jquery.min.js',
            source + 'js/*.min.js',
            '!' + source + 'js/scripts.min.js'
        ])
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(source + "js"));
});
