module.exports = function (gulp, plugins, config) {
	return plugins.sitespeed({
		urls: ['http://localhost:3000/'],
		depth: 1,
		html: 1,
		resultBaseDir: 'coverage/Sitespeed/'
	});
};
