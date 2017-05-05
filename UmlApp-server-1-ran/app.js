
// Express app
var express = require('express');
var app = express();

// Multer for storing zip files
var path = require('path');
var multer  = require('multer');
var upload = multer();

const uuidV1 = require('uuid/v1');


var isFileUploaded = false;


var cors = require('cors');
// Filesystem, unzip and child process
var fs = require('fs');
var unzip = require('unzip');
var exec = require('child_process').exec;

var diagramType = '';

//body parser for getting body of requests
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors());
// Setting up directories
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
var express = require('express');


var currFileName = '';
// File Upload location and properties
var storage = multer.diskStorage({
				destination: function (req, file, cb) {
					//console.log('arrived in destination');
					cb(null, __dirname + '/uploads');
				},
				filename: function (req, file, cb) {
					//console.log('arrived in filename');
					cb(null, file.originalname) //Appending .jp
				}
			});

var upload = multer({ storage: storage });
var uploadProfileImgs = upload.single('file');

// For sending a index.html
app.get('/',function(req,res){
		response = {};
		response.status = 200;
		res.send(response);
		res.end();
	});

//For Storing uploaded file and sending response
app.post('/t1/uploadFile', function (req, res) {

	response = {};
  	uploadProfileImgs(req, res, function (err) {
	    if (err) {
	    	console.log(err);

	    	response.status = '400';
	    	response.message="Something went wrong.! Please try again Later.";
	    }
	    else{

	    	//console.log(req.file);
		    global.currFileName = req.file.originalname;

			console.log(req.body.diagramType)

			global.diagramType = req.body.diagramType;

		    response.status = '200';
		    response.message="File Uploaded successfully";

		    global.isFileUploaded = true;
		}
	    res.send(response);
	    res.end();
	});
});

//For extracting zip and generating diagram
app.post('/t1/generateDiagram',function(req,res){

	if (global.isFileUploaded === true){

		var filePath = __dirname + '/uploads/' + global.currFileName;
		fs.createReadStream(filePath).pipe(unzip.Extract({ path: './extracted' }));
		//console.log('file in generate diagram : ');
	    //console.log(global.currFileName);

		var arr = global.currFileName.split(".");
		var dir = arr[0];
		//console.log('dir' + dir);
		var dirPath = "./extracted/"+dir+"";

		var compileQuery = ''

		if(global.diagramType === "class"){
			var compileQuery = "java -jar umlparser.jar "+dirPath + " "+dir+"";
		}else if(global.diagramType === "sequence"){
			var compileQuery = "java -jar umlsequenceparser.jar "+dirPath + " "+dir+"";
		}
		console.log('compileQuery : ' + compileQuery);

		exec(compileQuery, function(error, stdout, stderr) {

			if(error)
			{

				console.log('error in JAVA command');
				response = {};
				response.status = '400';
				response.message = 'Diagram NOT generated' + dir + '.png';
				res.send(response);
				res.end();
			}else{
				var fileName = uuidV1();
				if(global.diagramType === "class"){
					var source = "./" + dir + '.png';
					var destination = "./public/" + fileName + '.png'
					global.currFileName = fileName + '.png';

					console.log('source : ' + source);
					console.log('destination : ' + destination);
				}else if (global.diagramType === "sequence"){
					var source = "./UMLSequenceParser.png";
					var destination = "./public/" + fileName + '.png'
					global.currFileName = fileName + '.png';

					console.log('source : ' + source);
					console.log('destination : ' + destination);
				}
				fs.rename(source,destination,function(error){
					if(error)
					{

						console.log('error in RENAMING');
						response = {};
						response.status = '400';
						response.message = 'Diagram NOT generated';
						//console.log('Sending result');
						res.send(response);
						res.end();
					}
					else
					{
						console.log('PNG now accessible from public');
						response = {};
						response.status = '200';
						response.filename = global.currFileName;

						response.message = 'diagram generated successfully from ZIP file';
						//console.log('Sending result');
						res.send(response);
						res.end();
					}
				});
			}
			global.isFileUploaded = false;
		});
	}else
	{
		response = {};
		response.status = '400';
		response.message = 'Upload a File First please.';
		console.log(response)
		res.send(response);
		res.end();
	}
});


// Setting PORT
app.set('port', process.env.PORT || 3000);

// Setting up default error handler
app.use(function (req, res, next) {
	var response = {};

    response.status = '404';
 	response.message = "Not found";
 	res.send(response);
 	res.end();
});

// Setting up server to listen on PORT
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

//Exporting module
//module.exports = {app,currFileName};
