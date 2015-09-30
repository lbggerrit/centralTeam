'use strict';
var StoreClass = require('../helper/class/store.js');

class TableStore extends StoreClass {
	constructor() {
		super('tableStore', {
			data: [],
			'data--nosync': true,
			dataName: 'table-dummy',
			getDataAction: 'GET_DATA',
			limit: 10,
			setLimitAction: 'SET_LIMIT',
			currentKey: 1,
			keyHistory: [],
			setCurrentKeyAction: 'SET_CURRENT_KEY'
		});
	}
	reducer(state, actionObject) {

		var nextKey;

		// Following the Flux pattern it is recommended to use a switch statement
		// in your reducer. This reinforces the point ot the reducer being a
		// functional programming like system with a simple input and a single output
		// More information:
		// https://facebook.github.io/flux/docs/flux-utils.html#content
		switch (actionObject.action) {

			case this.actions.GET_DATA: {
				state.dataName = actionObject.dataName;
				return state;
			}
			case this.actions.GET_DATA_COMPLETE: {
				state.data = actionObject.data;
				return state;
			}
			case this.actions.SET_LIMIT: {
				state.limit = parseInt(actionObject.limit, 10);
				return state;
			}
			case this.actions.SET_CURRENT_KEY: {
				nextKey = parseInt(actionObject.currentKey, 10);
				if (state.currentKey !== nextKey) {

					if (state.currentKey || state.currentKey === 0) {
						state.keyHistory.unshift(state.currentKey);
					}
					state.currentKey = nextKey;
				}
				return state;
			}
			default: {
				return state;
			}

		}
	}
}

module.exports = new TableStore();
