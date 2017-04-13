var fs = require('fs');
var unzip = require('unzip');
var exec = require('child_process').exec;
var filePath = __dirname + '/uploads' + currFileName;
fs.createReadStream(filePath).pipe(unzip.Extract({ path: './extracted' }));

console.log("currFileName" + currFileName);
var arr = currFileName.split(".");
var dir = arr[0];
console.log('dir' + dir);
var dirPath = "./extracted/"+dir+"";

console.log('dirPath' + dirPath);
var complileit = "java -jar umlparser.jar ./extracted/"+dir+" finalp";

exec(compileit, function(error, stdout, stderr) {
});
