// -------------
// Copying Fonts
// -------------

module.exports = function(gulp, plugins, config) {
    return function() {

        // copy fonts
	   gulp.src(config.assetpath.fonts.src)
	   .pipe(gulp.dest('./dist' + config.assetpath.fonts.dist));

    };
};
