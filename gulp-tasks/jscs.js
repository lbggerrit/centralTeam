module.exports = function(gulp, plugins) {
	return function() {
		return gulp.src([
			'app/components/**/*.jsx',
			'app/journeys/**/*.jsx',
			'app/flux/**/*{.js,.jsx}'
		])
			.pipe(plugins.jscs())
			.pipe(plugins.jscs.reporter());
	};
};
