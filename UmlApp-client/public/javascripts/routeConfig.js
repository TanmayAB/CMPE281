var umlApp = angular.module('umlApp',['ngRoute','ngFileUpload']);

umlApp.config(function($routeProvider){
	console.log("arrived in route config");
	$routeProvider
		.when("/",{
			templateUrl : "/login.html",
			controller : "authController"
		})
		.when("/grading",{
			templateUrl : "/grading.html",
			controller : "gradeController"
		})
		.otherwise({
			templateUrl : "/login.html",
			controller : "authController"
		});
});	