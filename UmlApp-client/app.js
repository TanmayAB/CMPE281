
// Express app
var express = require('express');
var app = express();
var mysql      = require('mysql');

// Multer for storing zip files
var path = require('path');

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var connection = mysql.createConnection({
  host     : 'cmpe281uml.cmanzzaluxe4.us-west-2.rds.amazonaws.com',
  user     : 'root1234',
  password : 'root1234',
  database : 'umlparser'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});


// For sending a index.html
app.get('/',function(req,res){
		res.render('index');
		res.end();
	});

// For inserting data into database
app.post('/grade',function(req,res){

	console.log('inside grade API');

		response = {};
		console.log(req.body);
		tenant = req.body.tenant;
		if(tenant === "t001"){
			grade = req.body.grades
			connection.query("INSERT INTO TENANT1_R(GRADE) VALUES ('"+grade+"')", function (error, results, fields) {
					if (error) throw error;
			});
			connection.query("INSERT INTO TENANT_DATA(TENANT_ID,TENANT_TABLE,COLUMN_1) VALUES ('t001','TENANT1_R','"+grade+"')", function (error, results, fields) {
					if (error) throw error;

			});
			connection.end();
		}else if(tenant === "t002"){
			remarks = req.body.remarks
			percentage = req.body.percentage
			connection.query("INSERT INTO TENANT2_D(PERCENTAGE,REMARKS) VALUES ('"+percentage+"','"+remarks+"')", function (error, results, fields) {
					if (error) throw error;

			});
			connection.query("INSERT INTO TENANT_DATA(TENANT_ID,TENANT_TABLE,COLUMN_1,COLUMN_2) VALUES ('t002','TENANT2_D','"+percentage+"','"+remarks+"')", function (error, results, fields) {
					if (error) throw error;

			});
			connection.end();
		}else if(tenant === "t003") {
			score = req.body.score
			connection.query("INSERT INTO TENANT3_H(SCORE) VALUES ('t003','"+score+"')", function (error, results, fields) {
					if (error) throw error;

			});
			connection.query("INSERT INTO TENANT_DATA(TENANT_ID,TENANT_TABLE,COLUMN_1) VALUES ('t003','TENANT3_H','"+score+"')", function (error, results, fields) {
					if (error) throw error;

			});
			connection.end();
		} else if(tenant === "t004"){
			status = req.body.status
			remarks4 = req.body.remarks4
			connection.query("INSERT INTO TENANT4_H(STATUS,REMARKS) VALUES ("+status+"','"+remarks4+"')", function (error, results, fields) {
					if (error) throw error;

			});
			connection.query("INSERT INTO TENANT_DATA(TENANT_ID,TENANT_TABLE,COLUMN_1,COLUMN_2) VALUES ('t004','TENANT4_U','"+status+"','"+remarks4+"')", function (error, results, fields) {
					if (error) throw error;

			});
			connection.end();
		}
		response.status='200';
		response.message="Value stored"

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
