var prettyError = require('./helpers/prettyError.js');

module.exports = function(gulp, plugins, config) {
	// require('./helpers/taskTracker.js')(gulp);
	var isBuild = plugins.gutil.env.build ? true : false;

	function getFilename(path) {
		return path.split('/').slice(-1)[0];
	}

	return function() {
		var entries = plugins.glob.sync('app/journeys/**/*.mount.jsx');
		var transforms = [['babelify', {'loose': 'all', ignore: ['app/assets/js/vendor/jquery.custom.js']}]];
		var bundles;

		if (isBuild) {
			transforms.push(['uglifyify', {global: true}]);
		}
		bundles = entries.map(function(entry) {
			return plugins.browserify(entry, {
				transform: transforms
			})
			.bundle()
			.on('error', function(err) {
				var pError = prettyError(err);

				console.log(pError.message);
				console.log(pError.stack);
				plugins.notifier.notify({ title: 'Browserify Build Error', message: pError.message });
				this.emit('end');
			})
			.pipe(plugins.source( getFilename(entry) ))
			.pipe(plugins.rename({
				extname: isBuild ? '.min.js' : '.js'
			}))
			.pipe(gulp.dest(isBuild ? config.buildPath + config.buildPathPublic + '/assets/js' : 'app/assets/js/bundles'));

		});
		return plugins.es.merge.apply(null, bundles)
			.pipe(plugins.browserSync.stream());
	};
};
