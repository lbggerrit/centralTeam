var storeManager = require('../../app/flux/helper/storeManager.js');
var fluxHelper = require('../../app/flux/helper.js');
var storeState = require('./storeState');
var diff = require('deep-diff');

function update(sessionID, storeName, diffed) {
	var source = JSON.parse(JSON.stringify(fluxHelper(storeName).getState())),
		i;
	// apply differences to the server store
	for (i = 0; i < diffed.length; ++i ) {
		diff.applyChange(source, true, diffed[i]);
	}

	fluxHelper(storeName).setState(source);
}
function clear(sessionID) {
	storeManager.clearSession(sessionID);
}

function handleFluxAction(sessionID, storeName, action, payload, redirect) {

	var actionLib, error, redirectLocation;

	if (typeof payload !== 'object') {
		return {
			error: true,
			message: 'Payload is not an object',
			payload
		};
	}

	storeManager.setSessionName(sessionID);

	actionLib = storeManager.getActions(storeName);
	error = null;
	redirectLocation = {
		url: false,
		useReferringUrl: false
	};

	if ( actionLib && action && actionLib[action] ) {

		delete payload.redirect;

		payload.action = action;
		// Fires flux action
		actionLib[action](payload);

		if ( !redirect ) {
			redirectLocation.useReferringUrl = true;
		} else if ( redirect !== 'die' ) {
			redirectLocation.url = redirect;
		}

	} else {
		error = {
			error: true,
			message: 'Action not found in Action library',
			storeName,
			action,
			payload
		};
	}

	return error || redirectLocation;
}

module.exports = {
	getStoreStates: storeState.getStoreStates,
	handleFluxAction,
	update,
	clear
};
