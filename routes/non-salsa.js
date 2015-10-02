module.exports = function(app) {
	app.get('/api/non-salsa/resource', function(req, res, next) {
		var sampleJson,
			data;
		sampleJson = {
			'nonSalsaProperty': 'nonSalsaValue'
		};
		data = JSON.stringify(sampleJson);
		res.writeHead(200, {
			'Content-Length': data.length,
			'Content-Type': 'application/json'
		});
		res.end(data);
	});

	app.get('/api/quote/aapl', function(req, res, next) {
		var wsdlHandler = require('../server/utils/wsdl-handler.js'),
			url = 'http://www.webservicex.com/stockquote.asmx?wsdl',
			args = {symbol: 'AAPL'};
		wsdlHandler.run(url, args, 'GetQuote', res);
	});
};