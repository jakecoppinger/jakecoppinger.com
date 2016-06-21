"use strict";
var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var print = require('gulp-print');

var source = "source/";
var build = "dist/"

var resizeImageTasks = [];
[1920,1100,720].forEach(function(size) { // , 1200, 720]
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
            
            .pipe(print(function(path) {
                return path
            }))
            //.pipe(pipes.image.optimize())
            .pipe(gulp.dest(output))
    });
    resizeImageTasks.push(resizeImageTask);
});

gulp.task('images', resizeImageTasks);
