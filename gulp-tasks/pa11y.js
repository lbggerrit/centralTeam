module.exports = function (gulp, plugins) {
	return plugins.pa11y({
		url: ['http://localhost:3000'],
		standard: 'WCAG2A',
		timeout: 20000,
		reporter: 'console'
	});
};
