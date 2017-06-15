// -------------------------------------
// For concatinating & minifying scripts
// -------------------------------------

module.exports = function(gulp, plugins, config) {
    return function() {

        gulp.src(config.assetpath.js.src + '**/*.js')
            .pipe(plugins.concat('scripts.js'))
            .pipe(gulp.dest('./dist' + config.assetpath.js.dist))
            .pipe(plugins.uglify())
            .pipe(plugins.rename({suffix: '.min'}))
            .pipe(gulp.dest('./dist' + config.assetpath.js.dist));

    };
};
