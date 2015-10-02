var
	soap = require('soap'),
	parseString = require('xml2js').parseString;

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
					if(req.url.indexOf('api/get-quote') != -1) {
						// var
						// 	url = 'http://www.webservicex.com/stockquote.asmx?wsdl',
						// 	args = {symbol: 'AAPL'};
						//
						// console.log(res);
						//res.send(args);
						//
						// res.setHeader('Access-Control-Allow-Origin', '*');
						//
						// soap.createClient(url, function(err, Client) {
						// 	Client.GetQuote(args, function(err, result) {
						// 		parseString(result[Object.keys(result)[0]], function(err, json) {
						// 			res.end(json);
						// 		});
						// 	});
						// });
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
