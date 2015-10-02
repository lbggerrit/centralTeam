var
	soap = require('soap'),
	parseString = require('xml2js').parseString;

function SoapToJson(url = '', args = {}) {
	var
		json;

	soap.createClient(url, function(err, Client) {
		Client.GetQuote(args, function(err, result) {
			parseString(result[Object.keys(result)[0]], function(err, json) {
				// res.send(json);
			});
		});
	});


	return json
}

module.exports = SoapToJson;
