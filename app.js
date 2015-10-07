var
	fs = require('fs'),
	path = require('path'),
	express = require('express'),
	favicon = require('serve-favicon'),
	app = express(),
	directorys = [
		'www/'
	],
	RouteDir = 'routes',
	files = fs.readdirSync(RouteDir),
	config = require('./server/config').init();

directorys.map(function(directory) {
	app.use(express.static(directory));
});

files.forEach(function(file) {
	var filePath = path.resolve('./', RouteDir, file),
		route = require(filePath);
	route(app);
});

app.use(favicon(__dirname + config.faviconPath));

app.listen(config.appEnv.port, config.appEnv.bind, function() {
	console.log('Server starting on ' + config.appEnv.url);
});