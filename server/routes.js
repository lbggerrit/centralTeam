module.exports = function(app) {
	app.get('/path', function(req, res, next) {
		res.send('path return Duc');
	});
};
