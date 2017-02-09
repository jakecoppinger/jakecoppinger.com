"use strict";
var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var print = require('gulp-print');
//var imagemin = require('gulp-imagemin');

var webp = require('gulp-webp');

var source = "source/";
//var build = "dist/"

var processImageTasks = [];
[1920, 1100, 720].forEach(function(size) {

    // This is the destination, because the real source is
    // original_images
    var output = source + 'images/' + size + '/';

    var jpegTask = 'jpeg_resize_' + size;
    gulp.task(jpegTask, function() {
        return gulp.src(source + 'original_images/**/*.{jpg,png,tiff}')
            .pipe(imageResize({
                format: 'jpeg',
                width: size,
                quality: 0.9,
                upscale: false
            }))
            .pipe(print(function(path) {
                return "JPEG " + size + ": " + path
            }))
            .pipe(gulp.dest(output))
    });
    processImageTasks.push(jpegTask);


    var webpTask = 'webp_resize_' + size;
    gulp.task(webpTask, function() {
        return gulp.src(source + 'original_images/**/*.{jpg,png,tiff}')
            .pipe(imageResize({
                width: size,
                upscale: false
            }))
            .pipe(webp({
                quality: 65 // Quality setting from 0 to 100
            }))
            .pipe(print(function(path) {
                return "WebP " + size + ": " + path
            }))
            .pipe(gulp.dest(output))
    });
    processImageTasks.push(webpTask);

});

gulp.task('images', processImageTasks)