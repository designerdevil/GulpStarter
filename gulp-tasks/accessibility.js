// ------------------------------------------------------
// For Running accessibility test on generated html files
// ------------------------------------------------------

module.exports = function(gulp, plugins, config) {
    return function() {

        gulp.src('dist/*.html')
            .pipe(plugins.accessibility({
                force: true,
                accessibilityLevel: 'WCAG2AA',
    			/*Levels are WCAG2A, WCAG2AA, WCAG2AAA, and Section508*/
                ignore: [
                    'WCAG2A.Principle2.Guideline2_4.2_4_2.H25.1.NoTitleEl',
                    'WCAG2A.Principle3.Guideline3_1.3_1_1.H57.2'
                ]
            }))
            .on('error', console.log)
            .pipe(plugins.accessibility.report({
                reportType: 'txt',
                reportLevels: {
                    'notice': false,
                    'warning': true,
                    'error': true
                }
            }))
            .pipe(plugins.rename({
                extname: '.txt'
            }))
            .pipe(gulp.dest('reports/txt'));
    };
};
