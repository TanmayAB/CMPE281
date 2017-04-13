var app = angular.module('umlApp',['ngFileUpload']);

app.controller('mainController', function ($scope, $http){
	
	$scope.generateDiagram = function() {

		console.log('inside generateDiagram');
		$http({
	  		method: 'POST',
	  		url: '/generateDiagram'
		}).then(function successCallback(response) {
	    	// this callback will be called asynchronously
	    	// when the response is available
	  		console.log('response')
	  		console.log(response.data);
	  	}, function errorCallback(response) {
	    	// called asynchronously if an error occurs
	    	// or server returns response with an error status.
	  		console.log('error');
	  		console.log(response);
	  	});
	};

 });

app.controller('MyCtrl',function($scope,$http,Upload) {
		console.log('inside my ctrl');
	 $scope.submit = function() {
	 	console.log('inside submit');
     if ($scope.file) {
      	console.log('file in scope');
        console.log($scope.file);
       	var file_tobe_sent = $scope.file;
      console.log('inside generateDiagram');
		$scope.upload = Upload.upload({
            url: '/uploadFile',
            data: {
                file: $scope.file
            }
        }).then(function (resp) {
            console.log('successful');
        }, function (resp) {
        	console.log('successful');
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
	}
    };
});

