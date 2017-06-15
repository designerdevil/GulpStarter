// -----------------------------------------------------------
// For concatinating & minifying scss - including autoprefixer
// -----------------------------------------------------------

module.exports = function(gulp, plugins, config) {
    return function() {

        gulp.src([bases.src + 'templates/pages/**/*.hbs'], {})
            .pipe(
                hb({
                    debug: true,
                    helpers: [
                        './node_modules/handlebars-layouts',
                    ],
                    data: bases.src + 'asstes/js/data/**/*.{js,json}'
                })
                .partials(bases.src + 'templates/partials/**/*.hbs')
                .partials(bases.src + 'components/**/*.hbs')
            )
            .pipe(rename({
                extname: ".html"
            }))
            .pipe(gulp.dest(bases.dist));

    };
};
