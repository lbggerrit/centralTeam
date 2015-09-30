module.exports = function(gulp, plugins, config) {
	return function() {

		return plugins.jquery.src({
			release: 1, //jQuery 1
			flags: ['-ajax/jsonp',
						'-ajax/script',
						'-deprecated',
						'-effects',
						'-event/alias',
						'-manipulations',
						'-queue',
						'-traversing',
						'-wrap',
						'-core/ready',
						'-exports']
		})
		.pipe(gulp.dest('./app/assets/js/vendor'));
	}
};
