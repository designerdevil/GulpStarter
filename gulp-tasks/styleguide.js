// -------------------------------------
// For concatinating & minifying scripts
// -------------------------------------

module.exports = function(gulp, plugins, config) {
    return function() {

        gulp.src(config.assetpath.css.src + 'style.scss')
            .pipe(plugins.styleguide.generate({
                title: 'My Styleguide',
                server: true,
                rootPath: './styleguide',
                overviewPath: 'README.md'
            }))
            .pipe(gulp.dest('./styleguide'));

        gulp.src(config.assetpath.css.src + 'style.scss')
            .pipe(plugins.sass({
                errLogToConsole: true
            }))
            .pipe(plugins.styleguide.applyStyles())
            .pipe(gulp.dest('./styleguide'));

    };
};
