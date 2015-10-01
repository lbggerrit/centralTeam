var
	express = require('express'),
	app = express(),
	directorys = [
		'www/'
	],
	RestServices = require('./server/rest-services.js'),
	server;

// master change

console.log('test comment');

server = app.listen(3000, function() {
	var
		host = server.address().address,
		port = server.address().port;

	console.log('Build server running at http://%s:%s', host, port);
});
directorys.map(function(directory) {
	app.use(express.static(directory));
});

RestServices.getQuote(app);
