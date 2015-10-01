module.exports = function(gulp, plugins, config) {
	return function() {
		gulp
			.src(config.buildPath, {read: false})
			.pipe(plugins.clean());
	};
};
