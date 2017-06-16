// -----------------------------------------------------------
// For concatinating & minifying scss - including autoprefixer
// -----------------------------------------------------------

module.exports = function(gulp, plugins, config) {
    return function() {

        gulp.src([config.assetpath.bases.src + 'templates/pages/**/*.hbs'], {})
            .pipe(
                plugins.hb({
                    //debug: true,
                    helpers: [
                        'node_modules/handlebars-layouts',
                    ],
                    data: config.assetpath.bases.src + 'asstes/js/data/**/*.{js,json}'
                })
                .partials(config.assetpath.bases.src + 'templates/partials/**/*.hbs')
                .partials(config.assetpath.bases.src + 'components/**/*.hbs')
            )
            .pipe(plugins.rename({
                extname: ".html"
            }))
            .pipe(gulp.dest('./dist'));

    };
};
