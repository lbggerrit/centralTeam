var
	soap = require('soap'),
	parseString = require('xml2js').parseString,
	restServices;

restServices = {
	getQuote: function(app) {
		app.get('/get-quote', function(req, res) {
			var
				url = 'http://www.webservicex.com/stockquote.asmx?wsdl',
				args = {symbol: 'AAPL'};

			soap.createClient(url, function(err, Client) {
				Client.GetQuote(args, function(err, result) {
					parseString(result[Object.keys(result)[0]], function(err, json) {
						res.send(json);
					});
				});
			});
		});
	}
}

module.exports = restServices;
