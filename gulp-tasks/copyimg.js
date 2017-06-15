// -----------------
// Imageminification
// -----------------

module.exports = function(gulp, plugins, config) {
    return function() {

        // images
		gulp.src(config.assetpath.img.src)
		.pipe(plugins.imagemin())
		.pipe(gulp.dest('./dist' + config.assetpath.img.dist));

    };
};
