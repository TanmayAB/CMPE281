
// Express app
var express = require('express');
var app = express();

// Multer for storing zip files
var path = require('path');

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
var express = require('express');



// For sending a index.html
app.get('/',function(req,res){
		res.render('index');
		res.end();
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
