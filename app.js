var express = require('express'),
	favicon = require('serve-favicon'),
	expressApp = express(),
	expressAppRouter = express.Router(),
	config = require('./server/config').init(),
	directories = [
		'www/'
	];

directories.map(function(directory) {
	expressApp.use(express.static(directory));
});

expressApp.use(favicon(__dirname + config.faviconPath));
expressApp.use('/api', require('./server/utils/router').getRoute(expressAppRouter, './server/routes/api.js'));
expressApp.use(function(req, res, next) {
	res.status(404);
	res.end('404 Page Not Found');
});
expressApp.listen(config.appEnv.port, config.appEnv.bind, function() {
	console.log('Server starting on ' + config.appEnv.url);
});
