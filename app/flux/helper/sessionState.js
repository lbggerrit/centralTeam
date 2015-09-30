var defaultStoreStates,
	sessions,
	currentSessionID;

/**
 * @class SessionState
 * @description Handles the states of stores for multiple sessions
 */
class SessionState {
	constructor() {
		var globalStoreKeys,
			i;
		defaultStoreStates = {};
		sessions = {};

		if (frameworkGlobals.isClient) {
			currentSessionID = 'client';

			// If there's predefined store states from the server populate
			// the client session immediately
			if (window.globalStores) {
				globalStoreKeys = Object.keys(window.globalStores);

				for (i = 0; i < globalStoreKeys.length; ++i) {
					this.setStore(globalStoreKeys[i], window.globalStores[globalStoreKeys[i]]);
				}
			}
		}

	}

	setSessionID(sessionID) {
		currentSessionID = sessionID;
	}

	getSession() {
		if (!sessions[currentSessionID]) {
			sessions[currentSessionID] = {};
		}

		return sessions[currentSessionID];
	}

	/**
	 * @description deep copies a default store object to be
	 *              referenced when creating a new store state
	 * @param {String} storeName reference string of store
	 * @param {Object} defaultState JSON object copied when creating a new store state
	 */
	setDefaultStoreState(storeName, defaultState) {
		defaultStoreStates[storeName] = JSON.parse(JSON.stringify(defaultState));
	}

	/**
	 * sets the default store state if there is a default state already defined
	 * @param {String} storeName reference string of store
	 * @return {Boolean}           Success boolean if a state was defined
	 */
	populateFromDefaultState(storeName) {
		if (!defaultStoreStates[storeName]) {
			return false;
		}
		this.getSession()[storeName] = JSON.parse(JSON.stringify(defaultStoreStates[storeName]));
		return true;
	}

	getStore(storeName) {
		if (!this.getSession()[storeName]) {
			this.populateFromDefaultState(storeName);
		}
		return this.getSession()[storeName];
	}

	setStore(storeName, storeState) {

		this.getSession()[storeName] = storeState;
	}

}

module.exports = new SessionState();
