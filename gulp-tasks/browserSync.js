var url = require('url');
var proxy = require('proxy-middleware');
module.exports = function(gulp, plugins) {
	var proxyOptions = url.parse('http://localhost:3000/api');
	proxyOptions.route = '/api';
	return function() {
		plugins.browserSync.init({
			port: 9000,
			server: {
				baseDir: ['app/journeys', 'app'],
				routes: {
					'/data': 'mockdata'
				},
				directory: true,
				middleware: [proxy(proxyOptions)]
			},
			open: false,
			logLevel: 'silent',
			notify: false
		});
	};
};
