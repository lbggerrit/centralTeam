global.frameworkGlobals = {
	isServer:true,
	isClient:false,
	isDev:false,
	basePath:''
};

var requireDir = require('require-dir');

//For jsx compilation
require('babel/register');

requireDir('./specs');
