'use strict';
var
	fluxHelper = require('../../helper.js'),
	actionConstants = require('../../constants/actionConstants.js');

/**
 * @class storeClass
 * @description boilerplate flux class that includes a string
 *        reference.. Also automatically registers the
 *        store with the flux helper for global access
 *        across the application.
 */
class storeClass {
	constructor(storeName, defaultState) {
		this.defaultState = defaultState;
		this.defaultState.storeName = storeName;
		this.storeName = storeName;
		this.actions = actionConstants.getActionConstants(storeName);
		fluxHelper.registerStore(storeName, this, this.defaultState);
	}
	reducer(state, actionObject) {

		// Following the Flux pattern it is recommended to use a switch statement
		// in your reducer. This reinforces the point ot the reducer being a
		// functional programming like system with a simple input and a single output
		// More information:
		// https://facebook.github.io/flux/docs/flux-utils.html#content
		switch (actionObject.action) {
			default: {
				return state;
			}
		}
	}
	getState() {
		return fluxHelper(this.storeName).getState();
	}
	setState(state) {
		return fluxHelper(this.storeName).setState(state);
	}
}

module.exports = storeClass;
