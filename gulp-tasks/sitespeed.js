module.exports = function (gulp, plugins, config) {
	return plugins.sitespeed({
		urls: ['http://localhost:9000/', 'http://localhost:9000/example/', 'http://localhost:9000/example/index.html'],
		depth: 1,
    html: 1,
    resultBaseDir: 'coverage/Sitespeed/'
	});
}; 
