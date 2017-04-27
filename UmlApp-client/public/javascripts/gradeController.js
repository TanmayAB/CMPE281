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
	$scope.diagram = null;


	$scope.tenant1 = {};
	$scope.tenant2 = {};
	$scope.tenant3 = {};
	$scope.tenant4 = {};

	$scope.tenant1.display = false;
	$scope.tenant2.display = false;
	$scope.tenant3.display = false;
	$scope.tenant4.display = false;

	$scope.isRequestSent = false;
	$scope.isDiagramGenerated = false;
	$scope.grades = [
		{grade : "A"},
		{grade : "B"},
		{grade : "C"},
		{grade : "D"}
	];

	$scope.scores = [
		{score : "1"},
		{score : "2"},
		{score : "3"},
		{score : "4"},
		{score : "5"}
	];


	$scope.display = function()
	{
		console.log($scope.selectedTenant);
		if($scope.selectedTenant === "t001" || $scope.selectedTenant === "t002")
		{
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

		$scope.tenant1.display = false;
		$scope.tenant2.display = false;
		$scope.tenant3.display = false;
		$scope.tenant4.display = false;
		$scope.diagram=null;
		$scope.isDiagramGenerated = false;

	};
	$scope.generateDiagram = function() {

			console.log('inside generateDiagram');
			$scope.isRequestSent = true;
			$http({
		  		method: 'POST',
		  		url: 'http://localhost:3001/generateDiagram'
			}).then(function successCallback(response) {
		    	// this callback will be called asynchronously
		    	// when the response is available
		  		console.log('response')
		  		//console.log(response.data);

		  		console.log('status ' + response.status);
		  		console.log('filename ' + response.filename);
		  		if(response.data.status === "200")
		  		{
		  			var filename = response.data.filename;
		  			console.log(filename);
		  			$scope.diagram = "http://localhost:3001/"+filename+""
		  			console.log('$scope.diagram is  ' + $scope.diagram);
		  		}
				console.log('checking tenants');

				console.log($scope.tenants);

		  		if($scope.selectedTenant === "t001"){
		  			$scope.tenant1.display = true;
					$scope.tenant2.display = false;
					$scope.tenant3.display = false;
					$scope.tenant4.display = false;

					console.log('It\'s tenant 1');
		  		}

		  		else if($scope.selectedTenant === "t002"){
		  			$scope.tenant1.display = false;
					$scope.tenant2.display = true;
					$scope.tenant3.display = false;
					$scope.tenant4.display = false;

					console.log('It\'s tenant 2');
		  		}
		  		else if($scope.selectedTenant === "t003"){
		  			$scope.tenant1.display = false;
					$scope.tenant2.display = false;
					$scope.tenant3.display = true;
					$scope.tenant4.display = false;

					console.log('It\'s tenant 3');
		  		}
		  		else if($scope.selectedTenant === "t004"){
		  			$scope.tenant1.display = false;
					$scope.tenant2.display = false;
					$scope.tenant3.display = false;
					$scope.tenant4.display = true;

					console.log('It\'s tenant 4');
		  		}


		  	}, function errorCallback(response) {
		    	// called asynchronously if an error occurs
		    	// or server returns response with an error status.
		  		console.log('error');
		  		console.log(response);
		  	});

		  	move();

		  	function move() {
			  	var elem = document.getElementById("myBar");
			  	var width = 10;
			  	var id = setInterval(frame, 30);
			  	function frame() {
			   		if (width >= 100) {
			   			$scope.isDiagramGenerated = true;
			   			console.log("Diagram generated ? : " + $scope.isDiagramGenerated)
			   			console.log("now ? : " + $scope.isDiagramGenerated)

			      		clearInterval(id);
			    	} else {
			      		width++;
			      		elem.style.width = width + '%';
			      		elem.innerHTML = width * 1  + '%';
			    	}
			  	}
			}
	};

	$scope.submit = function() {

		if($scope.isText === true && $scope.javaCode != '')
		{
			$scope.isIncomplete = false;

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
			$scope.isIncomplete = false;

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
	}
});
