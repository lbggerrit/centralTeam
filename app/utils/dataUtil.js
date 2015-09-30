/* global frameworkGlobals */
var $ = require('../assets/js/vendor/jquery.custom.js');

function getJsonFromDataFolder(dataName, callback, errorCallback) {
	var data;

	// Check if we're in a browser
	if ( frameworkGlobals.isClient ) {

		$.ajax( '/data/' + dataName + '.json' ).done(
			function(responseData) {
				callback(responseData);
			}).fail(errorCallback);
	// if we're in nodejs the call has to be synchronous
	} else if ( frameworkGlobals.isServer ) {

		// use sync lib to grab data in node but not through browserify...
		data = require('../../mockdata/' + dataName + '.json');

		callback(data);
	}
}

module.exports = {
	getJsonFromDataFolder
};
