var
	fs = require('fs'),
	path = require('path'),
	express = require('express'),
	app = express(),
	directorys = [
		'www/'
	],
	RouteDir = 'routes',
	files = fs.readdirSync(RouteDir),
	server;

server = app.listen(3000, function() {
	var
		host = server.address().address,
		port = server.address().port;

	console.log('Build server running at http://%s:%s but cant see host', host, port);
});

directorys.map(function(directory) {
	app.use(express.static(directory));
});

files.forEach(function(file) {
	var filePath = path.resolve('./', RouteDir, file),
		route = require(filePath);
	route(app);
});
