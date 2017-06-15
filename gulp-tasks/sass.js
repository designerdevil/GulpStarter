// -----------------------------------------------------------
// For concatinating & minifying scss - including autoprefixer
// -----------------------------------------------------------

module.exports = function(gulp, plugins, config) {
    return function() {

        gulp.src(config.assetpath.css.src + 'style.scss')
            .pipe(plugins.sass())
            .pipe(plugins.autoprefixer())
            .pipe(gulp.dest('./dist' + config.assetpath.css.dist))
			.pipe(plugins.minifyCss({ keepSpecialComments: 1, processImport: false }))
			.pipe(plugins.rename({suffix:'.min'}))
            .pipe(gulp.dest('./dist' + config.assetpath.css.dist));

    };
};
