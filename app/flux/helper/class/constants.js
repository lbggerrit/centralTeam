var fluxHelper = require('../../helper.js');

var actionConstants = null;

/**
 * @class ConstantsClass
 * @description simple wrapping class that freezes the constants and registers
 *              them to be used globally by the helpers.
 */
class ConstantsClass {
	constructor(constants) {
		actionConstants = constants;
		Object.freeze(actionConstants);

		fluxHelper.registerActionConstants(this.getActionConstants());
	}
	getActionConstants(storeName) {
		if (storeName) {
			if (!actionConstants[storeName]) {
				throw 'Action Constants for ' + storeName + ' undefined';
			}
			return actionConstants[storeName];
		}
		return actionConstants;
	}

}

module.exports = ConstantsClass;
