var self = module.exports = {
	getRoute: function(expressRouter, routeFilePath) {
		var bindRoutesTo = require('./../../' + routeFilePath);
		bindRoutesTo(expressRouter);
		return expressRouter;
	}
};
