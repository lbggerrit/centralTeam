var constants = {};

/**
 * @class ConstantsManager
 * @description singleton storage class to keep app related constants
 */
class ConstantsManager {
	constructor() {}

	setConstants(initialConstants) {
		constants = initialConstants;
	}
	getConstants(storeName) {
		if (!constants[storeName]) {
			throw 'Constants missing for ' + storeName;
		}
		return constants[storeName];
	}
}

module.exports = new ConstantsManager();
