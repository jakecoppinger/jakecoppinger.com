"use strict";
var gulp = require('gulp');
var foreach = require("gulp-foreach");
var file = require("gulp-file");
var runSequence = require('run-sequence');
var del = require('del');
var addsrc = require('gulp-add-src');

var films = require('../source/data.json').films;

function titleToFilename(title) {
    var newTitle = title.toLowerCase().split(' ').join('_')
    return newTitle;
}

gulp.task('cleanFilm', function() {
    del.sync('source/pages/film/*');
});

gulp.task("createFilmTemplates", ['cleanFilm'], function() {
    var stream2 = gulp.src('source/dummy.json')
        .pipe(foreach(function(stream, f) {
            for (var film in films) {
                stream.pipe(file(titleToFilename(film) + ".html", '{% extends "film.njk" %}{% set title = "' + film + '" %}{% set film = films[title] %}))'))
                    .pipe(gulp.dest("source/pages/film"));
            }
            return stream;
        }))
    return stream2;
});
