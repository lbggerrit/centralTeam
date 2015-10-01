var prettyError = require('./helpers/prettyError.js');

module.exports = function(gulp, plugins, config) {
	var isBuild = plugins.gutil.env.build ? true : false;
	// require('./helpers/taskTracker.js')(gulp);

	return function() {
		gulp
			.src('app/sass/*.scss')
			.pipe(plugins.sass({
				includePaths: ['app/components'],
				outputStyle: isBuild ? 'compressed' : 'expanded'
			})
			.on('error', function(err) {
				var pError = prettyError(err);

				console.log(pError.message);
				console.log(pError.stack);
				plugins.notifier.notify({ title: 'Sass Build Error', message: pError.message });
				this.emit('end');
			}))
			.pipe(plugins.rename({
				extname: '.css'
			}))
			.pipe(gulp.dest(isBuild ? config.buildPath + config.buildPathPublic + '/assets/css' : 'app/assets/css'))
			.pipe(plugins.browserSync.stream());
	};
};
