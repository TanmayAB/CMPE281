var fs = require('fs');
var unzip = require('unzip');
var exec = require('child_process').exec;
var fs = require('fs');

//fs.createReadStream('./output.zip').pipe(unzip.Extract({ path: '.' }));
fs.createReadStream('./output.zip').pipe(unzip.Extract({ path: '.' }));

var complileit = "java -jar umlparser.jar C:\\Users\\admin\\Desktop\\ziptest\\output finalpic";

exports.getClassDiagram = function(callback){

	console.log('inside getClassDiagram');
	exec(complileit, function(error, stdout, stderr) {
		console.log('inside exec');
		console.log(error);
		response = stdout;
		console.log('Calling callback');
		callback(response);
	});

};