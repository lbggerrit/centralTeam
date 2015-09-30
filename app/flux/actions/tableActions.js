'use strict';
var
	ActionsClass = require('../helper/class/actions.js'),
	dataUtil = require('../../utils/dataUtil.js');

class TableActions extends ActionsClass {

	constructor() {
		super('tableStore');
	}

	GET_DATA(actionObject) {
		var tableStore = this.getStore(),
			tableState = tableStore.getState();

		if (frameworkGlobals.isServer || !tableState.data.length || tableState.dataName !== actionObject.dataName) {

			tableStore.dispatch({
				action: this.actions.GET_DATA,
				dataName: actionObject.dataName
			});

			dataUtil.getJsonFromDataFolder( actionObject.dataName, (function(data) {
				tableStore.fireAction('GET_DATA_COMPLETE')({data});
			}).bind(this));
		}

	}
}

module.exports = new TableActions();
