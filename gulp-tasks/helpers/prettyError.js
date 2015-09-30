
//Returns a pretty print output for the gulp error message
	module.exports = function(error){
		// console.log(error);
		try{
		// var splitMessage = error.message.split(': ');
		var folderLocation = error.fileName || error.file || error.filename,
			subFolderLocation = error.line && error.column !== undefined?
										folderLocation :
										folderLocation.split('/').slice(-3).join('/'),
			lineNumber = error.lineNumber || (error.loc && error.loc.line ) || (error.line + ':' + error.column),
			description = error.description || (error && error.toString()),
			dirName,
			cleanStack;

		//gulp-sass error description & stack parsing
		if(!description && error.column){
			description = error.message.split((error.line + ':' + error.column));
			description.shift();
			description.join('');
			cleanStack = error.stack;
		}
		else {

			//get the root directory in relation to /gulp-tasks/helper/
			dirName = __dirname.split('/');
			dirName.splice(-2);
			dirName = dirName.join('/') + '/';

			//Clean up the stack by removing repeatitive user
			//directory info and remove repeated error
			cleanStack =  error.stack.split(dirName).join('');

		}
		cleanStack = cleanStack.split(' at ');
		cleanStack.shift();
		cleanStack = cleanStack.join(' at ');
		cleanStack = 'at ' + cleanStack;
	}catch(e){
			return {message:error, stack:null};
	}

	return {message: subFolderLocation + ':' + lineNumber + '\n '+ description, stack: cleanStack};
}
