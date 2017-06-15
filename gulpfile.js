var gulp = require('gulp');
var browserSync = require('browser-sync');
var plugins = require('gulp-load-plugins')();
var gulpSequence = plugins.sequence;
// var gulpSequence = require('gulp-sequence');


/********************
Config file for Gulp
*********************/
var config = require('./config');


/*******************************
Fetching Isolated task files
********************************/
function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins, config);
}

/*************
Defining tasks
***************/
gulp.task('clean', getTask('clean'));
gulp.task('scripts', getTask('scripts'));
gulp.task('sass', getTask('sass'));
gulp.task('accessibility', getTask('accessibility'));
gulp.task('copy:imgs', getTask('copyimg'));
gulp.task('copy:fonts', getTask('copyfonts'));
gulp.task('copy:all', ['copy:imgs', 'copy:fonts']);


/*************
Build Modules
***************/
gulp.task('buildseq', function (cb) {
   gulpSequence('clean')(cb);
	setTimeout(function(cb2){
		gulpSequence('scripts', 'sass', 'copy:all')(cb2);
	}, 1000);
});


/*************
Main Build
***************/
gulp.task('default', ['buildseq'], function() {
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/sass/**/*.{sass,scss}', ['sass']);
});

