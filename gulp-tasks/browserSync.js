module.exports = function(gulp, plugins) {
	return function() {
		plugins.browserSync.init({
			port: 9000,
			server: {
				baseDir: ['app/journeys', 'app'],
				routes: {'/data': 'mockdata'},
				directory: true
			},
			open: false,
			logLevel: 'silent',
			notify: false
		});
	};
};
