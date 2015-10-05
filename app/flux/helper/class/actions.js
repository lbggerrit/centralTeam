'use strict';
var
	fluxHelper = require('../../helper.js'),
	actionConstants = require('../../constants/actionConstants.js');

/**
 * @class ActionClass
 * @description basic class wrapper that automatically registers the class
 * so that the actions can be used globally and they are added
 * to their respective store.
 */
class ActionClass {
	constructor(storeName) {
		this.actions = actionConstants.getActionConstants(storeName);
		this.storeName = storeName;
		fluxHelper.registerActions(storeName, this);
	}
	getStore() {
		return fluxHelper(this.storeName);
	}
}

module.exports = ActionClass;
