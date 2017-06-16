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
Asset Watchers
***************/
gulp.task('watcher-script', ['scripts'], function(done) {
    browserSync.reload();
    done();
});
gulp.task('watcher-sass', ['sass'], function(done) {
    browserSync.reload();
    done();
});
gulp.task('watcher-markup', ['markup'], function(done) {
    browserSync.reload();
    done();
});

/*************
Build Modules
***************/
gulp.task('buildseq', function(cb) {
    gulpSequence('clean')(cb);
    setTimeout(function(cb2) {
        gulpSequence('scripts', 'sass', 'markup', 'copy:all')(cb2);
    }, 1000);
});
gulp.task('styleguide', function(cb) {
    // gulpSequence('clean')(cb);
    setTimeout(function(cb2) {
        gulpSequence('markup', 'genstyle')(cb2);
    }, 1000);
});



/*************
Main Build
***************/
gulp.task('build', ['buildseq'], function(cb) {
    gulpSequence('buildseq')(cb);
    setTimeout(function(cb2) {
        browserSync.init(null, {
            server: {
                baseDir: "dist",
                index: "index.html"
            }
        });
    }, 1000);


    // Build with watcher on assets
    gulp.watch('src/assets/js/**/*.js', { interval: 500 }, ['watcher-script']);
    gulp.watch('src/assets/sass/**/*.{sass,scss}', { interval: 500 }, ['watcher-sass']);
    gulp.watch('src/components/**/*.{hbs}', { interval: 500 }, ['watcher-markup']);
    gulp.watch('src/templates/**/*.{hbs}', { interval: 500 }, ['watcher-markup']);

});

// Run default build
gulp.task('default', ['buildseq'], function() {});
