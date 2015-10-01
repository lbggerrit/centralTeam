module.exports = function(gulp, plugins, config) {
	return function() {
		gulp
			.src('package.json')
			.pipe(gulp.dest(config.buildPath));
	};
};
