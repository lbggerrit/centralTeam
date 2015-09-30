module.exports = function(gulp, plugins, config) {
	return function() {
		gulp.src( config.jasmine.tests + '_test.js')
			.pipe(plugins.jasmine());
	}
};
