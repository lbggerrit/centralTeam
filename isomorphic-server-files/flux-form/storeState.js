var requireDir = require('require-dir');

var stores = requireDir('../../app/flux/stores');

var storeData = {};

function getStoreStates() {
	 var storeKey;
	// Stores need to be required after
	// the application has started

	for (storeKey in stores) {
		storeData[storeKey] = stores[storeKey].getState();
	}
	// console.log(storeData);
	return storeData;
}

module.exports = {
	getStoreStates
};
