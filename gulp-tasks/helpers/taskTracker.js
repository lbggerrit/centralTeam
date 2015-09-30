module.exports = function(gulp){
	var _gulpStart = gulp.Gulp.prototype.start;

	var _runTask = gulp.Gulp.prototype._runTask;

	gulp.Gulp.prototype.start = function (taskName) {
		 this.currentStartTaskName = taskName;

		 _gulpStart.apply(this, arguments);
	};

	gulp.Gulp.prototype._runTask = function (task) {
		 this.currentRunTaskName = task.name;

		 _runTask.apply(this, arguments);
	};

}
