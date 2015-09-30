var fluxHelper = require('../../app/flux/helper');

var originalReference = null,
	actionListeners = [];

function addActionListener(listeningFunction){

	actionListeners.push(listeningFunction);

	return function(){
		if (actionListeners.indexOf(listeningFunction) > -1) {

			actionListeners.splice(actionListeners.indexOf(listeningFunction),1);
		}
	}
}

function mock() {
	if (!originalReference) {
		originalReference = {...fluxHelper.reference};
	}
	fluxHelper.reference.fluxHelper = function(storeName){
		var fluxInstance = originalReference.fluxHelper(storeName),
			mockedFluxInstance = {
				...fluxInstance
			};

		mockedFluxInstance.fireAction = function(action){
			return function(payload){
				for (var i = 0; i < actionListeners.length; ++i) {
					actionListeners[i](action,payload);
				}
			}
		}

		return mockedFluxInstance;
	};
}

function unmock(){
	if (originalReference) {
		var keys = Object.keys(originalReference);
		for (key in keys) {
			fluxHelper.reference[key] = originalReference[key];
		}
	}

}

module.exports = {
	mock,
	unmock,
	addActionListener
};
