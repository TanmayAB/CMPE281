
console.log("currFileName" + currFileName);
var arr = currFileName.split(".");
var dir = arr[0];
console.log('dir' + dir);
var dirPath = "./extracted/"+dir+"";

console.log('dirPath' + dirPath);
var complileit = "java -jar umlparser.jar ./extracted/"+dir+" finalp";

exec(compileit, function(error, stdout, stderr) {
});
