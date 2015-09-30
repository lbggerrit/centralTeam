module.exports = function(gulp, plugins) {
	return function() {
		return gulp.src(['app/components/**/*.jsx'])
			.pipe(plugins.eslint())
			.pipe(plugins.eslint.format());
	};
};
