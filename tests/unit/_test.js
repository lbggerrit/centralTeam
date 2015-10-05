var requireAll = require('require-all');

global.frameworkGlobals = {
	isServer: true,
	isClient: false,
	isDev: false,
	basePath: ''
};
// For jsx compilation
require('babel/register');

// Require all component specs
requireAll({
	dirname: __dirname + '/../../app/components/',
	filter: /(.+spec)\.jsx$/
});
