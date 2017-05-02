var fs = require('fs');
var unzip = require('unzip');
var exec = require('child_process').exec;
var fs = require('fs');

var app = require('./app.js');
var currFileName = app.currFileName;

//fs.createReadStream('./output.zip').pipe(unzip.Extract({ path: '.' }));
fs.createReadStream('./output.zip').pipe(unzip.Extract({ path: '.' }));

exports.getClassDiagram = function(callback){

	console.log('inside getClassDiagram');

	var filePath = __dirname + '/uploads' + currFileName;
	fs.createReadStream(filePath).pipe(unzip.Extract({ path: './extracted' }));

	console.log("currFileName" + currFileName);
	var arr = currFileName.split(".");
	var dir = arr[0];
	console.log('dir' + dir);
	var dirPath = "./extracted/"+dir+"";

	console.log('dirPath' + dirPath);

	var complileit = "java -jar umlparser.jar "+dirPath+" finalpic";

	exec(complileit, function(error, stdout, stderr) {
		console.log('inside exec');
		console.log(error);
		response = stdout;
		console.log('Calling callback');
		callback(response);
	});

};