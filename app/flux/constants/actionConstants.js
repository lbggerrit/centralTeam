var ConstantsClass = require('../helper/class/constants.js'),
	 keyMirror = require('keyMirror');

class ActionConstants extends ConstantsClass {
	constructor() {
		super({
			tableStore: keyMirror({
				GET_DATA: null,
				GET_DATA_COMPLETE: null,
				SET_LIMIT: null,
				SET_CURRENT_KEY: null
			})
		});
	}
}

module.exports = new ActionConstants();
