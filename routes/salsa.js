module.exports = function(app) {
	app.get('/api/salsa/example/resource', function(req, res, next) {
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

	app.get('/api/hello/:arg', function(req, res, next) {
		res.writeHead(200);
		res.end('Hello ' + req.params['arg']);
	});

	app.get('/api/salsa/hello', function(req, res, next) {
		var wsdlHandler = require('../server/utils/wsdl-handler.js'),
			url = 'http://condorsalsa.lbg.eu-gb.mybluemix.net/services/soap/helloWorld/wsdl?wsdl',
			args = {
				input: 'Tom'
			};
		wsdlHandler.run(url, args, 'modifyCommunicationProfiles', res);
	});

	app.get('/api/salsa/product-names', function(req, res, next) {
		var wsdlHandler = require('../server/utils/wsdl-handler.js'),
			url = 'http://condorsalsa.lbg.eu-gb.mybluemix.net/service/wsdl?wsdl',
			args = {
				request: {
					header: ''
				}
			};
		wsdlHandler.run(url, args, 'modifyCommunicationProfiles', res);
	});

	app.get('/api/salsa/product-names-mock', function(req, res, next) {
		//var wsdlHandler = require('../server/utils/wsdl-handler.js'),
		//	url = 'http://condorsalsa.lbg.eu-gb.mybluemix.net/service2/wsdl?wsdl',
		//	args = {
		//		request: {
		//			header: ''
		//		}
		//	};
		//wsdlHandler.run(url, args, 'modifyCommunicationProfiles', res);
		var sampleJson,
			data;
		sampleJson = {
			'response': {
				'involvedParty': {
					'account': [
						{'productName': 'Monthly Saver'},
						{'productName': 'Easy Saver'},
						{'productName': 'Cash ISA Saver'},
						{'productName': 'Private Banking Bridging Loan'},
						{'productName': 'Private Banking Bridging Loan'},
						{'productName': 'Monthl00005'},
						{'productName': 'Monthly Saver'},
						{'productName': 'Premier'},
						{'productName': 'Easy Saver'},
						{'productName': 'Monthly Saver'},
						{'productName': 'Monthly Saver'}
					]
				}
			}
		};
		data = JSON.stringify(sampleJson);
		res.writeHead(200, {
			'Content-Length': data.length,
			'Content-Type': 'application/json'
		});
		res.end(data);
	});
};