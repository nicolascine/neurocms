var gulp            = require('gulp'),
    jshint          = require('gulp-jshint'),
    jshintReporter  = require('jshint-stylish'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    less            = require('gulp-less'),
    watch           = require('gulp-watch'),
    del             = require('del'),
    plumber         = require('gulp-plumber'),
    gutil           = require('gulp-util'),
    expect          = require('gulp-expect-file'),
    uncss           = require('gulp-uncss'),
    csso            = require('gulp-csso'),
    livereload      = require('gulp-livereload');

// clean + autoprefix
var LessPluginCleanCSS = require("less-plugin-clean-css"),
    cleancss = new LessPluginCleanCSS({
        advanced: true
    });

var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix = new LessPluginAutoPrefix({
        browsers: ["last 2 versions"]
    });

//paths vars
var pathLESS            = 'devAssets/less/site.less',
    destCSS             = 'public/styles/',
    filesJS             = [
                            'devAssets/js/vendor/jquery/jquery.1.11.2.min.js',
                            'devAssets/js/vendor/bootstrap/bootstrap.min.js',
                            'devAssets/js/vendor/particlegroud/jquery.particleground.min.js',
                            'devAssets/js/neurocms.js'
                          ],
    destJS              = 'public/js/';
    compiledTemplates   = ['http://127.0.0.1:3000/blog', 'http://127.0.0.1:3000/blog/post/opengl']
    bootstrapIgnore     = [
                            ".fade",
                            ".fade.in",
                            ".navbar-collapse",
                            ".navbar-nav",
                            ".navbar-header",
                            ".navbar-left",
                            ".navbar-right",
                            ".navbar-nav.navbar-left:first-child",
                            ".navbar-nav.navbar-right:last-child",
                            ".navbar-text:last-child",
                            ".navbar-collapse.in",
                            ".in",
                            ".collapse",
                            ".collapse.in",
                            ".collapsing",
                            ".alert-danger",
                            /\.open/
                           ]

// BUILD - LESS
gulp.task('build-less', function() {
    gulp.src(pathLESS)
        .pipe(plumber())
        .pipe(expect(pathLESS))
        .pipe(less({
            plugins: [autoprefix, cleancss]
        }))
        .pipe(uncss({
           html: compiledTemplates,
           ignore: bootstrapIgnore
         }))
        .pipe(csso())
        .pipe(gulp.dest(destCSS))
        .pipe(livereload())
        .on('error', gutil.log);
});

// BUILD - JS
gulp.task('build-js', function() {
    gulp.src(filesJS)
        .pipe(plumber())
        .pipe(expect(filesJS))
        .pipe(concat('todo.min.js'))
        .pipe(uglify())
        .pipe(jshint())
        .pipe(gulp.dest(destJS))
        .pipe(livereload())
        .on('error', gutil.log);
});

// watch ~ DEFAULT
gulp.task('default', function() {
    
    livereload.listen();

    var watchJs    = ['devAssets/js/*/*.js'],
        watchLess  = ['devAssets/less/*/*.less'];

    gulp.watch(watchJs, ['build-js']);
    gulp.watch(watchLess, ['build-less']);

});

// watch ~ Only watch less files
gulp.task('watch-less', function() {
    livereload.listen();
    watchLess  = ['devAssets/less/*/*.less'];
    gulp.watch(watchLess, ['build-less']);
});

// watch ~ Only watch js files
gulp.task('watch-js', function() {
    livereload.listen();
    watchJs  = ['devAssets/js/*/*.js'];
    gulp.watch(watchJs, ['build-js']);
});
