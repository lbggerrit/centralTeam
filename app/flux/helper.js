var dispatcher = require('./helper/dispatcher.js'),
	storeManager = require('./helper/storeManager.js'),
	constantsManager = require('./helper/constantsManager.js');

var fluxInstances = {},
	reference;

/**
 * @description simple wrapper that allows a user
 *              to call a reference by it's name
 * @param  {Object} fluxInstance helper instance with access to the actions consts
 * @param  {Object} fluxActions  Action object that has all of the action functions exposed
 * @return {function}              action wrapper function
 */
function actionShortcutWrapper(fluxInstance, fluxActions) {
	return function(actionKey) {
		return fluxActions[fluxInstance.actions[actionKey]];
	};
}

/**
 * @description the reference object is used to allow mocking of the flux helper
 *              by allowing a mock library to replace the related default functions
 * @type {Object}
 */
reference = {
	fluxHelper: function(storeName) {

		var fluxInstance = {},
			fluxStore = null,
			fluxActions = null,
			fluxDispatcher = null;

		// Session information is managed automatically so we only need to
		// build out the flux instance once.
		if (!fluxInstances[storeName]) {

			fluxStore = storeManager.getStore(storeName);
			fluxActions = storeManager.getActions(storeName);

			if (!fluxStore) {
				throw new Error('Store ' + storeName + ' not registered');
			} else if (!fluxActions) {
				throw new Error('Actions for ' + storeName + ' not registered');
			}

			fluxDispatcher = dispatcher.get(fluxStore);

			fluxInstance.actions = constantsManager.getConstants(storeName);
			fluxInstance.fireAction = actionShortcutWrapper(fluxInstance, fluxActions);

			fluxInstance.getState = function() {
				return storeManager.getState(storeName);
			};
			fluxInstance.setState = function(state) {
				storeManager.setState(storeName, state);
			};

			fluxInstance.dispatch = fluxDispatcher.dispatch.bind(fluxDispatcher);
			fluxInstance.addListener = fluxDispatcher.addListener.bind(fluxDispatcher);

			fluxInstances[storeName] = fluxInstance;
		}
		return fluxInstances[storeName];
	},
	registerActionConstants: function(storeName, constants) {
		constantsManager.setConstants(storeName, constants);
	},
	getActionConstants: function(storeName) {
		return constantsManager.getConstants(storeName);
	},
	registerStore: function(storeName, store, defaultState) {
		var previousStore = storeManager.getStore(storeName);

		if (previousStore && previousStore === store) {
			return;
		}
		if (previousStore) {
			throw new Error('Store with name ' + storeName + ' already registered');
		}
		storeManager.buildDefaultActions(storeName);
		storeManager.setStore(storeName, store, defaultState);
	},
	registerActions: function(storeName, actionLib) {
		storeManager.setActions(storeName, actionLib);
	}
};

function fluxHelper(storeName) {
	return reference.fluxHelper(storeName);
}

fluxHelper.reference = reference;

fluxHelper.registerActionConstants = function(storeName, constants) {
	reference.registerActionConstants(storeName, constants);
};

fluxHelper.getActionConstants = function(storeName) {
	return reference.getActionConstants(storeName);
};

fluxHelper.registerStore = function(storeName, store, defaultState) {
	reference.registerStore(storeName, store, defaultState);
};
fluxHelper.registerActions = function(storeName, actionLib) {
	reference.registerActions(storeName, actionLib);
};

module.exports = fluxHelper;
