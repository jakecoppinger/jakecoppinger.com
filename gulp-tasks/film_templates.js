"use strict";
var gulp = require('gulp');
var foreach = require("gulp-foreach");
var file = require("gulp-file");
var runSequence = require('run-sequence');
var del = require('del');
var addsrc = require('gulp-add-src');

//var films = require('source/data.json').films;

var films = [{ "title": "Dark Matter" }];

gulp.task('cleanFilmTemplates', del.bind(null, ['source/pages/film']));

gulp.task("createFilmTemplates", function() {
    return gulp.src('source/dummy.json')
        .pipe(foreach(function(stream, f) {
            films.forEach(function(film) {
                stream
                    .pipe(file(film.title + ".html", '{% extends "film.njk" %}{% set title = "' + film.title + '" %}{% set film = films[title] %}))'))
                    .pipe(gulp.dest(".tmp/film"));
            });
            return stream;
        }))
        .pipe(addsrc([".tmp/film/*.html","!**.*/dummy.json"]))
        .pipe(gulp.dest("source/pages/film"));
});


gulp.task('cleanupFileTemplates', del.bind(null, ['source/pages/film/dummy.json']));

gulp.task("buildFilms", function(callback) {
    runSequence(
        ['cleanFilmTemplates'],['createFilmTemplates'],['cleanupFileTemplates'],
        callback);
});
