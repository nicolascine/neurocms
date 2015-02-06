gulp = require('gulp'),
jshint = require('gulp-jshint'),
jshintReporter = require('jshint-stylish'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
less = require('gulp-less'),
watch = require('gulp-watch'),
del = require('del');

// clean + autoprefix
var LessPluginCleanCSS = require("less-plugin-clean-css"),
    cleancss = new LessPluginCleanCSS({
        advanced: true
    });

var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix = new LessPluginAutoPrefix({
        browsers: ["last 2 versions"]
    });

var pathLESS = './devAssets/less/site.less',
    destCSS = './public/styles/',
    filesJS = ['./devAssets/js/jquery.particleground.min.js',
               './devAssets/js/neurocms.js'
    ],
    destJS = './public/js/';

// BUILD - LESS
gulp.task('build-less', function() {
    gulp.src(pathLESS)
        .pipe(less({
            plugins: [autoprefix, cleancss]
        }))
        .pipe(gulp.dest(destCSS));
});

// BUILD - JS
gulp.task('build-js', function() {
    gulp.src(filesJS)
        .pipe(concat('todo.min.js'))
        .pipe(uglify())
        .pipe(jshint())
        .pipe(gulp.dest(destJS));
});

// watch ~ DEFAULT
gulp.task('default', function() {

    gulp.watch('./devAssets/js/*.js', ['build-js']);
    gulp.watch('./devAssets/less/*/*.less', ['build-less']);

});