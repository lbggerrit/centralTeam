module.exports = function(app) {
	app.get('/api/salsa/resource', function(req, res, next) {
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
};