// var express = require('express');
// var router = express.Router();
// var draw = require('../draw');
// router.route('/')
// 	.get(function(req,res){
// 		res.render('index');
// 		res.end();
// 	});

// router.route('/generateDiagram')
// 	.post(function(req,res){

// 		console.log('calling getClassDiagram');
// 		draw.getClassDiagram(function(result){
			
// 			console.log('Inside callback  of getClassDiagram');
// 			console.log('Sending result');
// 			res.send(result);
// 			res.end();
// 		});	
// });

// module.exports = router;