var
	express = require('express'),
	app = express(),
	directorys = [
		'www/'
	],
	RestServices = require('./server/rest-services.js'),
	Routes = require('./server/routes.js'),
	server;

server = app.listen(3000, function() {
	var
		host = server.address().address,
		port = server.address().port;

	console.log('Build server running at http://%s:%s', host, port);
});
directorys.map(function(directory) {
	app.use(express.static(directory));
});

Routes(app);

RestServices.getQuote(app);
