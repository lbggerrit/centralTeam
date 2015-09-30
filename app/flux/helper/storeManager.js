var dispatcher = require('./dispatcher.js'),
	sessionState = require('./sessionState'),
	constantsManager = require('./constantsManager.js');

var actionLibs = {},
	storeClasses = {};

// Creates a unique function that uses the passed in
// payload to dispatch an action a predefined store
function bindDefaultActionFunction(actionName, actionLib, storeName) {

	actionLib[actionName] = function(actionParams) {
		if (!actionParams) {
			actionParams = {};
		}
		if (typeof(actionParams) !== 'object') {
			throw new Error('Default actions functions require an object with parameters');
		}
		actionParams.action = actionName;
		dispatcher.get(storeClasses[storeName]).dispatch(actionParams);
	};
}
/**
 * @class StoreManager
 * @description registers new stores, integrates with the sessionState
 *              object to allow for multiple app sessions server side.
 *              Adds default simple actions for the stores to use.
 */
class StoreManager {
	constructor() {

	}
	/**
	 * @description Registers a store object with the store manager.
	 * @param {String} storeName  			reference string of store
	 * @param {Store} store      				Store class object
	 * @param {Object} defaultStoreState 	JSON object of the default store state
	 */
	setStore(storeName, store, defaultStoreState) {
		storeClasses[storeName] = store;
		sessionState.setDefaultStoreState(storeName, defaultStoreState);
	}

	getState(storeName) {
		return sessionState.getStore(storeName);
	}

	setState(storeName, stateValue) {
		return sessionState.setStore(storeName, stateValue);
	}

	getStore(storeName) {
		return storeClasses[storeName];
	}

	setSessionName(sessionName) {
		sessionState.setSessionID(sessionName);
	}

	/**
	 * @description Creates a set of default action functions that
	 *              dispatch the passed in payload to the store reducer
	 * @param  {String} storeName reference string of store
	 */
	buildDefaultActions(storeName) {
		var storeConstants = constantsManager.getConstants(storeName),
			storeActionsLib = actionLibs[storeName] || {},
			key;

		for (key in storeConstants) {
			if (!storeActionsLib[key]) {
				bindDefaultActionFunction(key, storeActionsLib, storeName);
			}
		}
		actionLibs[storeName] = storeActionsLib;
	}

	getActions(storeName) {
		return actionLibs[storeName];
	}

	/**
	 * @description Passes a custom set of actions to the store manager and
	 *              adds the missing actions automatically
	 * @param {String} storeName reference string of store
	 * @param {Actions} actionFunctions Actions object containing the custom
	 *                                  action functions to replace the defaults
	 */
	setActions(storeName, actionFunctions) {
		var storeConstants = constantsManager.getConstants(storeName),
			key;
		// make sure there's an action function for every declared action
		if (!actionLibs[storeName]) {
			this.buildDefaultActions(storeName);
		}
		for (key in storeConstants) {
			if (typeof(actionFunctions[key]) === 'function') {
				actionLibs[storeName][key] = actionFunctions[key].bind(actionFunctions);
			}
		}
	}
}

module.exports = new StoreManager();
