var
	isDev = process.argv.indexOf('--isDev') > -1 ? true : false,
	cfAppEnv = require('cfenv').getAppEnv();

module.exports = {
	init: function() {
		return {
			'appEnv': {
				'port': isDev ? 3000 : cfAppEnv.port,
				'bind': isDev ? 'localhost' : cfAppEnv.bind,
				'url': isDev ? 'http://localhost:3000' : cfAppEnv.url
			},
			'faviconPath': isDev ? '/app/assets/icons/favicon.ico' : '/www/assets/icons/favicon.ico'
		};
	}
};
