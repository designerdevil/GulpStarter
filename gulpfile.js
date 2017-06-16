var gulp = require('gulp');
var browserSync = require('browser-sync');
var plugins = require('gulp-load-plugins')();
var gulpSequence = plugins.sequence;

plugins.styleguide = require('sc5-styleguide');
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
gulp.task('markup', getTask('markup'));
gulp.task('accessibility', getTask('accessibility'));
gulp.task('genstyle', getTask('styleguide'));
gulp.task('copy:imgs', getTask('copyimg'));
gulp.task('copy:fonts', getTask('copyfonts'));
gulp.task('copy:all', ['copy:imgs', 'copy:fonts']);


/*************
Build Modules
***************/
gulp.task('buildseq', function (cb) {
   gulpSequence('clean')(cb);
	setTimeout(function(cb2){
		gulpSequence('scripts', 'sass', 'copy:all', 'markup')(cb2);
	}, 1000);
});
gulp.task('styleguide', function (cb) {
   gulpSequence('clean')(cb);
	setTimeout(function(cb2){
		gulpSequence('genstyle')(cb2);
	}, 1000);
});


// gulp.task('styleguide:generate', function() {
//   return gulp.src('*.scss')
//     .pipe(styleguide.generate({
//         title: 'My Styleguide',
//         server: true,
//         rootPath: './dist',
//         overviewPath: 'README.md'
//       }))
//     .pipe(gulp.dest('./dist'));
// });

// gulp.task('styleguide:applystyles', function() {
//   return gulp.src('main.scss')
//     .pipe(plugins.sass({
//       errLogToConsole: true
//     }))
//     .pipe(styleguide.applyStyles())
//     .pipe(gulp.dest('./dist'));
// });

// gulp.task('watch', ['styleguide'], function() {
//   // Start watching changes and update styleguide whenever changes are detected
//   // Styleguide automatically detects existing server instance
//   gulp.watch(['*.scss'], ['styleguide']);
// });

// gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);


/*************
Main Build
***************/
gulp.task('build', ['buildseq'], function() {
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/sass/**/*.{sass,scss}', ['sass']);
});
gulp.task('default', ['buildseq'], function() {
});

