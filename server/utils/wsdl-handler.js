var soap = require('soap'),
	parseString = require('xml2js').parseString;

function handleError(url, err, res) {
	console.error('Error: Creating SOAP client for the provided URL: ' + url + '\n' + err);
	res.writeHead(403);
	res.end('Error: Creating SOAP client for the provided URL: ' + url + '\n' + err);
}

var self = module.exports = {
	run: function(url, args, operation, res) {
		soap.createClient(url, function(err, client) {
			if (err) {
				handleError(url, err, res);
				return;
			}
			client[operation](args, function(err, result) {
				result = result[Object.keys(result)[0]];
				if ((typeof result === 'string') && (result.charAt(0) === '<')) {
					parseString(result, function(err, json) {
						result = JSON.stringify(json);
					});
				} else {
					result = JSON.stringify(result);
				}
				if (!res._headerSent) {
					res.writeHead(200, {
						'Content-Length': result.length,
						'Content-Type': 'application/json'
					});
				}
				res.end(result);
			}, {timeout: 5000});
		});
	}
};
