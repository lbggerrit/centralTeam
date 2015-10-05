var gulp = require('gulp');
var plugins = {
	browserSync: require('browser-sync').create(),
	sass: require('gulp-sass'),
	browserify: require('browserify'),
	source: require('vinyl-source-stream'),
	reactify: require('reactify'),
	babelify: require('babelify'),
	rename: require('gulp-rename'),
	es: require('event-stream'),
	glob: require('glob'),
	jasmine: require('gulp-jasmine'),
	jquery: require('gulp-jquery'),
	notifier: require('node-notifier'),
	uglifyify: require('uglifyify'),
	eslint: require('gulp-eslint'),
	scssLint: require('gulp-scss-lint'),
	jscs: require('gulp-jscs'),
	gutil: require('gulp-util'),
	ejs: require('gulp-ejs'),
	clean: require('gulp-clean'),
	KarmaServer: require('karma').Server,
	sitespeed: require('gulp-sitespeedio'),
	pa11y: require('gulp-pa11y')
};

var config = {
	watchJsx: [
		'app/components/**/*.jsx',
		'mockdata/{,**/}*.{js}',
		'app/journeys/**/*.jsx',
		'app/flux/**/*{.js,.jsx}'
	],
	jasmine: {
		tests: 'tests/unit/'
	},
	sass: [
		'app/sass/**/*.{sass,scss}',
		'app/components/**/*.{sass,scss}'
	],
	buildPath: 'dist/',
	buildPathPublic: 'www/',
	buildPathServer: 'server/',
	buildPathRoutes: 'routes/'
};

var
	requireDir = require('require-dir'),
	tasks = requireDir('./gulp-tasks'),
	task;

for (task in tasks) {
	gulp.task(task, tasks[task](gulp, plugins, config));
}

gulp.task('default', ['browserSync', 'sass', 'browserify'], function() {
	gulp.watch(
		config.sass,
		['sass', 'scss-lint']
	);
	gulp.watch(
		config.watchJsx,
		['browserify']
	);
	gulp.watch(
		[
			'app/components/**/*.jsx',
			'app/journeys/**/*.jsx',
			'app/flux/**/*{.js,.jsx}'
		],
		['eslint', 'jscs']
	);

	// gulp.watch(['app/assets/js/bundles/*.js'], ['pa11y']);
});

gulp.task('production', ['sass', 'browserify', 'ejs'], function() {
	gulp
		.src([
			'app/assets/js/vendor/**/*.js',
			'!app/assets/js/vendor/jquery.custom.js'
		])
		.pipe(gulp.dest(config.buildPath + config.buildPathPublic + '/assets/js/vendor'));

	gulp
		.src([
			'app/assets/img/**/*'
		])
		.pipe(gulp.dest(config.buildPath + config.buildPathPublic + '/assets/img'));

	gulp
		.src([
			'app/assets/fonts/**/*'
		])
		.pipe(gulp.dest(config.buildPath + config.buildPathPublic + '/assets/fonts'));

	gulp
		.src([
			'mockdata/*'
		])
		.pipe(gulp.dest(config.buildPath + config.buildPathPublic + '/data'));

	gulp
		.src('server/**/*')
		.pipe(gulp.dest(config.buildPath + config.buildPathServer));

	gulp
		.src('routes/**/*')
		.pipe(gulp.dest(config.buildPath + config.buildPathRoutes));

	gulp
		.src('app.js')
		.pipe(gulp.dest(config.buildPath));
});

gulp.task('karma', function(done) {
	new plugins.KarmaServer({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done).start();
});

gulp.task('full-test', ['test', 'karma', 'sitespeed', 'pa11y']);
