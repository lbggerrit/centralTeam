module.exports = function(gulp, plugins, config) {
	return function() {
		return gulp.src('app/journeys/layout.ejs')
			.pipe(plugins.ejs({
				isBuild: true,
				pageTitle: 'Example React page',
				reactOutput: '',
				basePath: '/',
				pageId: 'example'
			}))
			.pipe(plugins.rename({
				basename: 'index'
			}))
			.pipe(gulp.dest(config.buildPath + config.buildPathPublic));
	};
};
