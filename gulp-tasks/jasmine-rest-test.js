module.exports = function(gulp, plugins, config) {
	return function() {
		gulp.src(config.jasmine.restTests)
			.pipe(plugins.jasmine());
	};
};
