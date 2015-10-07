var
	url = require('url'),
	proxy = require('proxy-middleware'),
	proxyOptions = url.parse('http://localhost:3000/api');

module.exports = function(gulp, plugins) {
	// setup proxy to talk to the api server
	proxyOptions.route = '/api';

	return function() {
		plugins.browserSync.init({
			port: 9000,
			server: {
				baseDir: ['app/journeys', 'app'],
				routes: {'/data': 'mockdata'},
				directory: true,
				middleware: [proxy(proxyOptions)]
			},
			open: false,
			logLevel: 'silent',
			notify: false
		});
	};
};
