umlApp.controller('gradeController', function gradeController($scope, $rootScope, $location, $http,Upload) {
	

	console.log('arrived in gradeController');
	$scope.tenants = [
		{tenant : "t001"},
		{tenant : "t002"},
		{tenant : "t003"},
		{tenant : "t004"}
	];
	$scope.isIncomplete = false;
	$scope.isZip = false;
	$scope.isText = false;
	$scope.isTenantSelected = false;
	$scope.javaCode = '';
	$scope.file = null;

	$scope.display = function()
	{
		console.log($scope.selectedTenant);
		if($scope.selectedTenant === "t001" || $scope.selectedTenant === "t002")
		{
			console.log('making it true');
			$scope.isZip = true;
			$scope.isText = false;
			$scope.isTenantSelected = true;

		}
		else if($scope.selectedTenant === "t003" || $scope.selectedTenant === "t004")
		{
			$scope.isZip = false;
			$scope.isText = true;
			$scope.isTenantSelected = true;

		}
	};
	$scope.generateDiagram = function() {

			console.log('inside generateDiagram');
			$http({
		  		method: 'POST',
		  		url: 'http://localhost:3001/generateDiagram'
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

	$scope.submit = function() {
		
		if($scope.isText === true && $scope.javaCode != '')
		{
			console.log('sending java code');
			console.log($scope.javaCode);
			$http({
		  		method: 'POST',
		  		url: 'http://localhost:3001/uploadFile',
		  		data: {javaCode : $scope.javaCode}
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

		}
		else if($scope.isZip === true && $scope.file != null)
		{
			console.log('sending zip file');
			console.log($scope.file);
			$scope.upload = Upload.upload({
				url: 'http://localhost:3001/uploadFile',
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
		else
		{
			$scope.isIncomplete = true;
		}
	};
});
