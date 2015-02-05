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
    cleancss = new LessPluginCleanCSS({advanced: true});

var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix = new LessPluginAutoPrefix({browsers: ["last 2 versions"]});


// Create variables for our project paths so we can change in one place
treamevent-streamtask('watch:lint', function () {
	gulp.src(paths.src)
		.pipe(watch())
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

// LESS
gulp.task('build-less',function () {
  gulp.src('./public/styles/site.less')
	.pipe(less({
	    plugins: [autoprefix, cleancss]
	  }))
    .pipe(gulp.dest('./public/styles/'));
});


// concatenar archivos JS
gulp.task('concatena-js',function () {
  gulp.src(['./public/js/misjs/jquery.particleground.min.js'
  			,'./public/js/misjs/neurocms.js'])
  .pipe(concat('todo.min.js'))
  .pipe(uglify())
  .pipe(jshint())
  .pipe(gulp.dest('./public/js/'));
});

// watch ~
gulp.task('watch', function(){

	gulp.watch('./public/js/misjs/*.js', ['concatena-js']);
	gulp.watch('./public/styles/*/*.less', ['build-less']);

});


/*
 * C  L  E  A  N 
gulp.task('clean', function(cb) {
    del(['./public/js/build/neurocms.min.js'], cb);
    del(['./public/styles/build/site.css'], cb);
});
 */
