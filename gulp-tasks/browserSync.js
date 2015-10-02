module.exports = function(gulp, plugins) {
	return function() {
		plugins.browserSync.init({
			port: 9000,
			server: {
				baseDir: ['app/journeys', 'app'],
				routes: {
					'/data': 'mockdata'
				},
				directory: true,
				middleware: function(req, res, next) {
					if (req.url.indexOf('api/get-quote') !== -1) {
						var wsdlHandler = require('../server/utils/wsdl-handler.js'),
							url = 'http://www.webservicex.com/stockquote.asmx?wsdl',
							args = {symbol: 'AAPL'};
						wsdlHandler.run(url, args, 'GetQuote', res);
					}
					next();
				}
			},
			open: false,
			logLevel: 'silent',
			notify: false
		});
	};
};
