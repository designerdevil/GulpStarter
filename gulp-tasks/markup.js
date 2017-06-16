// -----------------------------------------------------------
// For concatinating & minifying scss - including autoprefixer
// -----------------------------------------------------------

module.exports = function(gulp, plugins, config) {
    return function() {
        
        gulp.src([config.assetpath.html.pagesrc + 'pages/**/*.hbs'], {})
            .pipe(
                plugins.hb({
                    debug: true,
                    helpers: [
                        './node_modules/handlebars-layouts',
                    ],
                    data: config.assetpath.data.src + 'asstes/js/data/**/*.{js,json}'
                })
                .partials(config.assetpath.html.pagesrc + 'partials/**/*.hbs')
                .partials(config.assetpath.html.compsrc + '**/*.hbs')
            )
            .pipe(plugins.rename({
                extname: ".html"
            }))
            .pipe(gulp.dest("./dist"));

    };
};
