"use strict";
var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-with-env');
var markdown = require('nunjucks-markdown');
var marked = require('marked');
var data = require('gulp-data');
var environments = require('gulp-environments');
var development = environments.development;
var production = environments.production;

var source = "source/";
var build = "dist/"
var scssSource = source + "scss/**/*.scss";

gulp.task('html', ['createFilmTemplates'], function() {
    var env = nunjucksRender.nunjucks.configure([source + '/templates']);

    env.addFilter('titleToFilename', function(title) {
        var newTitle = title.toLowerCase().split(' ').join('_')
        return newTitle;
    });


    var renderer = new marked.Renderer();

    // Don't add IDs to header elements
    renderer.heading = function(text, level) {
        return '<h' + level + '>' + text + '</h' + level + '>';
    };

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        // tables: true,
        breaks: true,
        // pendantic: false,
        // sanitize: true,
        // smartLists: true,
        smartypants: true
    });

    markdown.register(env, marked);

    // Gets .html and .nunjucks files in pages
    var stream = gulp.src([source + 'pages/**/*.html'])
        // Renders template with nunjucks
        .pipe(data(function() {
            return require('../source/data.json')
        }))
        .pipe(data(function() {
            var envData = production() ? { "environment": "production" } : { "environment": "development" };
            return envData;
        }))
        .pipe(nunjucksRender(env))
        // output files in app folder
        .pipe(gulp.dest(source));
    return stream;
});
