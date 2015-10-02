var soap = require('soap'),
	parseString = require('xml2js').parseString;

var self = module.exports = {
	createClient: function(url, callback) {
		soap.createClient(url, callback);
	},
	run: function(url, args, operation, res) {
		soap.createClient(url, function(err, Client) {
			Client[operation](args, function(err, result) {
				result = result[Object.keys(result)[0]];
				if (result.charAt(0) === '<') {
					parseString(result, function(err, json) {
						result = JSON.stringify(json);
					});
				}
				res.writeHead(200, {
					'Content-Length': result.length,
					'Content-Type': 'application/json'
				});
				res.end(result);
			});
		});
	}
};
