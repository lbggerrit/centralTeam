module.exports = function (gulp, plugins) {
	return plugins.pa11y({
    url: ['http://localhost:9000/example/index.html'],
		standard: 'WCAG2A',
    timeout: 20000,
		reporter: 'console'
	});
}; 
