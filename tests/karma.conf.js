/* eslint-disable */
/* jscs: disable */
// Karma configuration
// Generated on Sun Oct 04 2015 09:24:29 GMT+0100 (BST)

module.exports = function(config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '../',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['browserify', 'jasmine'],

		// list of files / patterns to load in the browser
		files: [
			'tests/karma-globals.js',
			'app/components/**/*.spec.jsx'
			//'app/components/**/*.jsx'
		],

		// list of files to exclude
		exclude: [],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'tests/unit/_test.js': ['browserify'],
			'app/components/**/*.spec.jsx': ['browserify', 'react-jsx', 'coverage']
		},

		browserify: {
			//debug: true,
			transform: ['babelify']
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'coverage', 'html'],

		// the default configuration
		//htmlReporter: {
		//	outputDir: 'karma_html',
		//	templatePath: __dirname + '/jasmine_template.html'
		//},

		coverageReporter: {
			type: 'html',
			dir: 'coverage/'
		},

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

	})
}
