module.exports = function(gulp, plugins) {
	return function() {
		// console.log('my build task');
		gulp.src('app/journeys/example/example.mount.jsx', {read: false})
			.pipe(plugins.browserify({
				transform: [
					['babelify', {'loose': 'all', ignore: ['app/assets/js/vendor/jquery.custom.js']}],
					['uglifyify', {global: true}]
				],
				extensions: ['.jsx']
			}).bundle())
			// .pipe(plugins.rename({
			// 	extname: '.js'
			// }))
			.pipe(gulp.dest('./dist/assets/js'));

		return;
	};
};
