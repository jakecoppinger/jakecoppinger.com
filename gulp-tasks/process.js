"use strict";
var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var changed = require('gulp-changed');
var imageResize = require('gulp-image-resize');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var markdown = require('markdown');
var pipes = require('gulp-pipes');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');
var concat = require('gulp-concat');
var nunjucksRender = require('gulp-nunjucks-render');


var source = "source/";
var build = "dist/"
var scssSource = source + "scss/**/*.scss";

// HTML Templating
gulp.task('html', function() {
    return gulp.src('source/**/*.tpl.html')
        .pipe(fileinclude({
            basepath: source,
            filters: {
                markdown: markdown.parse
            }
        }))
        .pipe(rename({
            extname: ""
        }))
        .pipe(rename({
            extname: ".html"
        }))
        .pipe(gulp.dest(source))
});


gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src(source + 'pages/index.html')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: [source + '/templates']
    }))
  // output files in app folder
  .pipe(gulp.dest(source))
});

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
        .pipe(cleanCSS({ debug: true }, function(details) {
            console.log("<< " + details.name + ': ' + (details.stats.originalSize / 1024).toFixed(2) + "kb");
            console.log(">> " + details.name + ': ' + (details.stats.minifiedSize / 1024).toFixed(2) + "kb");
        }))
        .pipe(sourcemaps.write())
        .pipe(sourcemaps.init())
        .pipe(concatCss("style.min.css"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(source + "css"))
});

// JavaScript
var jsFiles = source + "js/**/*.js";
var jsDest = build + "js";

gulp.task('uglifyjs', function() {
    return gulp.src([
            source + 'js/*.js'
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

var resizeImageTasks = [];
[1920, 1200, 720].forEach(function(size) {
    var output = source + 'images/' + size + '/';
    var resizeImageTask = 'resize_' + size;
    gulp.task(resizeImageTask, function() {
        return gulp.src(source + 'original_images/**/*.{jpg,png,tiff}')
            .pipe(imageResize({
                format: 'jpeg',
                width: size,
                quality: 0.9,
                upscale: false
            }))
            //.pipe(pipes.image.optimize())
            .pipe(gulp.dest(output))
    });
    resizeImageTasks.push(resizeImageTask);
});

gulp.task('resizeimages', resizeImageTasks);
