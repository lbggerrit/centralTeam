module.exports = function(gulp, plugins, config) {
	return function() {
		var sassFiles = config.sass.concat('!app/sass/bootstrap/**/**/*.*');
		return gulp.src(sassFiles)
			.pipe(plugins.scssLint());
	};
};
