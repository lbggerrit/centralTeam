module.exports = function(router) {
	router.get('/non-salsa/resource', function(req, res, next) {
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

	router.get('/quote/aapl', function(req, res, next) {
		var wsdlHandler = require('../utils/wsdl-handler.js'),
			url = 'http://www.webservicex.com/stockquote.asmx?wsdl',
			args = {symbol: 'AAPL'};
		wsdlHandler.run(url, args, 'GetQuote', res);
	});
	router.get('/salsa/example/resource', function(req, res, next) {
		var sampleJson,
			data;
		sampleJson = {
			'someProperty': 'someValue',
			'anotherProperty': 'anotherValue'
		};
		data = JSON.stringify(sampleJson);
		res.writeHead(200, {
			'Content-Length': data.length,
			'Content-Type': 'application/json'
		});
		res.end(data);
	});

	router.get('/hello/:arg', function(req, res, next) {
		res.writeHead(200);
		res.end('Hello ' + req.params['arg']);
	});

	router.get('/salsa/hello', function(req, res, next) {
		var wsdlHandler = require('../utils/wsdl-handler.js'),
			url = 'http://condorsalsa.lbg.eu-gb.mybluemix.net/services/soap/helloWorld/wsdl?wsdl',
			args = {
				input: 'Tom'
			};
		wsdlHandler.run(url, args, 'sayHello', res);
	});

	router.get('/salsa/product-names', function(req, res, next) {
		var wsdlHandler = require('../utils/wsdl-handler.js'),
			url = 'http://condorsalsa.lbg.eu-gb.mybluemix.net/service/wsdl?wsdl',
			args = {
				request: {
					header: ''
				}
			};
		wsdlHandler.run(url, args, 'modifyCommunicationProfiles', res);
	});

	router.get('/salsa/product-names-mock', function(req, res, next) {
		var wsdlHandler = require('../utils/wsdl-handler.js'),
			url = 'http://condorsalsa.lbg.eu-gb.mybluemix.net/service2/wsdl?wsdl',
			args = {
				request: {
					header: ''
				}
			};
		wsdlHandler.run(url, args, 'modifyCommunicationProfiles', res);
	});
};