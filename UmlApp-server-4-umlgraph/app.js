
// Express app
var express = require('express');
var app = express();

// Multer for storing zip files
var path = require('path');
var multer  = require('multer');
var upload = multer();
const uuidV1 = require('uuid/v1');


var cors = require('cors');
// Filesystem, unzip and child process
var fs = require('fs');
var unzip = require('unzip');
var exec = require('child_process').exec;

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


// For sending a index.html
app.get('/',function(req,res){
		res.render('index');
		res.end();
	});

//For Storing uploaded file and sending response
app.post('/uploadFile', function (req, res) {

	var dirPath = "./extracted";


	fs.writeFile("./extracted/A.java", req.body.javaCode, function(err) {

		response = {};

		if(err) {
    		//console.log(err);
    		response.status = '400';
    		response.message="Unable to save file (JAVACODE)";
		}
		else {

    		console.log("The file was saved!");
			response = {};
			response.status = '200';
	    	response.message="JAVACODE received successfully";
    	}
    	res.send(response);
    	res.end();
	});
});

//For extracting zip and generating diagram
app.post('/generateDiagram',function(req,res){

	//var compileQuery = "umlgraph "+dirPath+"/A png ";
	var compileQuery="umlgraph ./extracted/A png";

	exec(compileQuery, function(error, stdout, stderr) {

		if(error)
		{
			console.log('error in JAVA command');
			response = {};
			response.status = '400';
			response.message = 'Diagram NOT generated';
			//console.log('Sending result');
			res.send(response);
			res.end();
		}
		else
		{
			var fileName = uuidV1();
			var destinationPath = "./public/" + fileName + ".png";
			fs.rename('./extracted/A.png',destinationPath,function(error){
				if(error)
				{

					console.log('error in RENAMING');
					response = {};
					response.status = '400';
					response.message = 'JAVA code is in invalid format.!';
					//console.log('Sending result');
					res.send(response);
					res.end();
				}
				else
				{
					console.log('PNG now accessible from public');
					response = {};
					response.filename = fileName + '.png';
					response.status = '200';
					response.message = 'diagram generated successfully from JAVACODE';
					//console.log('Sending result');
					res.send(response);
					res.end();
				}
			});
		}
	});
});


// Setting PORT
app.set('port', process.env.PORT || 3004);

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
