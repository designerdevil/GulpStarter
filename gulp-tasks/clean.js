// -------------
// Clearing dist
// -------------

module.exports = function(gulp, plugins, config) {
    return function() {
    	
        gulp.src('dist/', { read: false })
            .pipe(plugins.clean({
                force: true
            }));

    };
};
