'use strict';

var createHistory = require('history/lib/createHistory');
var createBrowserHistory = require('history/lib/createBrowserHistory');
var createHashHistory = require('history/lib/createHashHistory');
var historyObjects = {}
//createHistory wrapper that allows for a base url to be defined
//https://github.com/rackt/history/issues/61
function useBasename(createHistory) {
	return function (options = {}) {
		var { basename, ...historyOptions } = options, 
			history = createHistory(historyOptions);

		function listen(listener) {
			return history.listen(function (location) {
				// When new locations are emitted, remove the basename
				// from the beginning of the pathname.
				if (location.pathname.indexOf(basename) === 0) {
					location.pathname = location.pathname.replace(basename, '');
				}

				listener(location)
			})
		};

		// Override all navigation functions with basename-aware versions.
		function pushState(state, path) {
			history.pushState(state, createPath(path));
		};

		function replaceState(state, path) {
			history.replaceState(state, createPath(path));
		};

		function createPath(path) {
			return basename + path
		};

		function createHref(path) {
			//  console.log(path);
			return history.createHref(createPath(path))
		};

		return {
			...history,
			pushState,
			replaceState,
			createPath,
			createHref,
			listen
		};
	}
};

function createBaseNameHistory() {
	var basename = frameworkGlobals.basePath; //Global basepath variable

	if (frameworkGlobals.isDev) {
		historyObjects[basename] = historyObjects[basename] || createHashHistory();
	} else if (frameworkGlobals.isClient) {
		historyObjects[basename] = historyObjects[basename] || useBasename(createBrowserHistory)({basename});
	} else if (frameworkGlobals.isServer) {
		historyObjects[basename] = historyObjects[basename] || useBasename(createHistory)({basename});
	}
	return historyObjects[basename];
}

module.exports = {
	createHistory: createBaseNameHistory
};
