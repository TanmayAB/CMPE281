
// Express app
var express = require('express');
var app = express();

// Multer for storing zip files
var path = require('path');
var multer  = require('multer');
var upload = multer();

//body parser for getting body of requests
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Setting up directories
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

// Different APIs :
var apis = require('./routes/apis');

// Default route handler
app.use('/', apis); 

var currFileName = '';
// File Upload location and properties
var storage = multer.diskStorage({
				destination: function (req, file, cb) {
					console.log('arrived in destination');
					cb(null, __dirname + '/uploads');
				},
				filename: function (req, file, cb) {
					console.log('arrived in filename');
					cb(null, file.originalname	) //Appending .jp
				}
			});

var upload = multer({ storage: storage });
var uploadProfileImgs = upload.single('file');

//For Storing uploaded file and sending response
app.post('/uploadFile', function (req, res) {
  	uploadProfileImgs(req, res, function (err) {
	    if (err) {
	    	console.log(err.message);
	    	// An error occurred when uploading
	    	response = {};
	    	response.status = '400';
	    	response.message="Something went wrong.! Please try again Later.";
	    	res.send(response);
	    	res.end();
	    }
	    console.log('Everything went fine');
	    response = {};
	    currFileName = req.file.originalname;
	    response.status = '200';
	    response.message="File Uploaded successfully";
	    res.send(response);
	    res.end();
	});
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
module.exports = {app,currFileName};