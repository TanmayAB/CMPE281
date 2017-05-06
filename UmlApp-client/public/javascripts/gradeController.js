umlApp.controller('gradeController', function gradeController( $interval,$scope, $rootScope, $location, $http,Upload) {

	$scope.url = "http://LoadBalancerforUMLParser-1408717123.us-west-2.elb.amazonaws.com:3000"

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

	$scope.isSubmitted = false;


	$scope.isTenant1 = false;

	$scope.tenant1 = {};
	$scope.tenant2 = {};
	$scope.tenant3 = {};
	$scope.tenant4 = {};

	$scope.tenant1.diagramType = '';
	$scope.tenant1.display = false;
	$scope.tenant2.display = false;
	$scope.tenant3.display = false;
	$scope.tenant4.display = false;
	$scope.isInValidJavaCode = false;


	$scope.isInvalidFile = false;


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


	$scope.clearDiagram = function(){

		$scope.isRequestSent = false;
	}

	$scope.display = function()
	{
		console.log($scope.selectedTenant);
		if($scope.selectedTenant === "t001")
		{
			$scope.isTenant1 = true;
			$scope.isZip = true;
			$scope.isText = false;
			$scope.isTenantSelected = true;

		}
		else if($scope.selectedTenant === "t001" || $scope.selectedTenant === "t002" || $scope.selectedTenant === "t003")
		{
			$scope.isTenant1 = false;
			$scope.isZip = true;
			$scope.isText = false;
			$scope.isTenantSelected = true;

		}
		else if($scope.selectedTenant === "t004")
		{
			$scope.isTenant1 = false;
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

	$scope.submit = function() {

		$scope.isInValidJavaCode = false;
		if($scope.isText === true && $scope.javaCode != '')
		{
			if($scope.selectedTenant === "t004"){
				$scope.isIncomplete = false;

				console.log('sending java code');
				console.log($scope.javaCode);
				$http({
			  		method: 'POST',
			  		url: 'http://LoadBalancerforUMLParser-1408717123.us-west-2.elb.amazonaws.com:3000/t4/uploadFile',
			  		data: {javaCode : $scope.javaCode}
				}).then(function successCallback(response) {

			  	}, function errorCallback(response) {

			  	});
			  	$scope.javacode = '';
			  	$scope.isSubmitted = true;

			}

		}
		else if($scope.isZip === true && $scope.file != null)
		{
			console.log('now checking tenants');
			if($scope.selectedTenant === "t001"){
				$scope.isIncomplete = false;

				console.log('sending zip file');
				console.log($scope.file);
				$scope.upload = Upload.upload({
					url: 'http://LoadBalancerforUMLParser-1408717123.us-west-2.elb.amazonaws.com:3000/t1/uploadFile',
					data: {
						file: $scope.file,
						diagramType : $scope.tenant1.diagramType
					}
				}).then(function (resp) {
					console.log(resp);
				}, function (resp) {
					console.log(resp);
				}, function (evt) {
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
				});
			}else if($scope.selectedTenant === "t002"){
				$scope.isIncomplete = false;

				console.log('sending zip file');
				console.log($scope.file);
				$scope.upload = Upload.upload({
					url: 'http://LoadBalancerforUMLParser-1408717123.us-west-2.elb.amazonaws.com:3000/t2/uploadFile',
					data: {
						file: $scope.file
					}
				}).then(function (resp) {
				}, function (resp) {
				}, function (evt) {
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
				});
			}else if($scope.selectedTenant === "t003"){
				$scope.isIncomplete = false;

				console.log('sending zip file');
				console.log($scope.file);
				$scope.upload = Upload.upload({
					url: 'http://LoadBalancerforUMLParser-1408717123.us-west-2.elb.amazonaws.com:3000/t3/uploadFile',
					data: {
						file: $scope.file
					}
				}).then(function (resp) {
				}, function (resp) {
				}, function (evt) {
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
				});
			}
			$scope.file = null;
			$scope.isSubmitted = true;
			$scope.message = "File Uploaded Successfully..!!";

		}
		else
		{
			$scope.isIncomplete = true;
			$scope.isSubmitted = false;
		}
		$scope.isDiagramGenerated = false;

	}

	$scope.generateDiagram = function() {

		console.log('inside generateDiagram');

		if($scope.isSubmitted === true){

			$scope.message = "";
			$scope.isRequestSent = true;
			$scope.isSubmitted = false;

			console.log('checking tenant')
			console.log($scope.selectedTenant)
	  		if($scope.selectedTenant === "t001"){

	  			$scope.tenant1.display = true;
				$scope.tenant2.display = false;
				$scope.tenant3.display = false;
				$scope.tenant4.display = false;

				console.log('tenant is t1');
				$http({
		  			method: 'POST',
		  			url: 'http://LoadBalancerforUMLParser-1408717123.us-west-2.elb.amazonaws.com:3000/t1/generateDiagram'
				}).then(function successCallback(response) {

			  		//console.log(response.data);
			  		//console.log(response.data.message);
			  		//console.log(response.data.status);
			  		if(response.data.status === "200") {
			  			var filename = response.data.filename;
			  			console.log(filename);
			  			$scope.diagram = "http://LoadBalancerforUMLParser-1408717123.us-west-2.elb.amazonaws.com:3000/t1/"+filename+""
			  			console.log('$scope.diagram is  ' + $scope.diagram);
			  			$scope.isInvalidFile = false;

			  		}
			  		else if(response.data.status === "400")
			  		{
			  			$scope.isInvalidFile = true;
			  		}

					console.log('It\'s tenant 1');
	  			});

	  		}
	  		else if($scope.selectedTenant === "t002"){

	  			$scope.tenant1.display = false;
				$scope.tenant2.display = true;
				$scope.tenant3.display = false;
				$scope.tenant4.display = false;

				$http({
		  			method: 'POST',
		  			url: 'http://LoadBalancerforUMLParser-1408717123.us-west-2.elb.amazonaws.com:3000/t2/generateDiagram'
				}).then(function successCallback(response) {

			  		console.log('response')
			  		//console.log(response.data);

			  		console.log('status ' + response.status);
			  		console.log('filename ' + response.filename);
			  		if(response.data.status === "200") {
			  			var filename = response.data.filename;
			  			console.log(filename);
			  			$scope.diagram = "http://LoadBalancerforUMLParser-1408717123.us-west-2.elb.amazonaws.com:3000/t2/"+filename+""
			  			console.log('$scope.diagram is  ' + $scope.diagram);
			  			$scope.isInvalidFile = false;
			  		}
			  		else if(response.data.status === "400")
			  		{
			  			$scope.isInvalidFile = true;
			  			$scope.isRequestSent = false;

			  		}

					console.log('It\'s tenant 2');
	  			});
	  		}
	  		else if($scope.selectedTenant === "t003"){

	  			$scope.tenant1.display = false;
				$scope.tenant2.display = false;
				$scope.tenant3.display = true;
				$scope.tenant4.display = false;

				$http({
		  			method: 'POST',
		  			url: 'http://LoadBalancerforUMLParser-1408717123.us-west-2.elb.amazonaws.com:3000/t3/generateDiagram'
				}).then(function successCallback(response) {

			  		console.log('response')
			  		//console.log(response.data);

			  		console.log('status ' + response.status);
			  		console.log('filename ' + response.filename);
			  		if(response.data.status === "200") {
			  			var filename = response.data.filename;
			  			console.log(filename);
			  			$scope.diagram = "http://LoadBalancerforUMLParser-1408717123.us-west-2.elb.amazonaws.com:3000/t3/"+filename+""
			  			console.log('$scope.diagram is  ' + $scope.diagram);
			  			$scope.isInvalidFile = false;
			  		}
			  		else if(response.data.status === "400")
			  		{
			  			$scope.isInvalidFile = true;
			  			$scope.isRequestSent = false;

			  		}

					console.log('It\'s tenant 3');
	  			});
	  		}
	  		else if($scope.selectedTenant === "t004"){

	  			console.log('inside 4th tenant')

	  			$scope.tenant1.display = false;
				$scope.tenant2.display = false;
				$scope.tenant3.display = false;
				$scope.tenant4.display = true;
				$http({
		  			method: 'POST',
		  			url: 'http://LoadBalancerforUMLParser-1408717123.us-west-2.elb.amazonaws.com:3000/t4/generateDiagram'
				}).then(function successCallback(response) {

			  		console.log('response')
			  		//console.log(response.data);

			  		console.log('status ' + response.data.status);
			  		console.log('filename ' + response.filename);
			  		if(response.data.status === "200") {
			  			var filename = response.data.filename;
			  			console.log(filename);
			  			$scope.isInValidJavaCode = false;
			  			$scope.diagram = "http://LoadBalancerforUMLParser-1408717123.us-west-2.elb.amazonaws.com:3000/t4/"+filename+""
			  			console.log('$scope.diagram is  ' + $scope.diagram);
			  		}else if(response.data.status === "400") {
			  			console.log(response.data.message);
			  			$scope.isInValidJavaCode = true;
			  			$scope.isRequestSent = false;
			  		}

					console.log('It\'s tenant 4');
	  			});
	  		}
	  		if($scope.isInvalidFile == false && $scope.isInValidJavaCode == false){
			  	var elem = document.getElementById("myBar");
			  	var width = 10;
			  	var id = $interval(function() {
			   		if (width == 100) {
			   			console.log($scope.isDiagramGenerated);
			   			$scope.isDiagramGenerated = true;
			   			console.log($scope.isDiagramGenerated);

			   			$interval.cancel(id);
			    	}	else {
			      		width++;
			      		elem.style.width = width + '%';
			      		elem.innerHTML = width * 1  + '%';
			    	}
			  	}, 50);
	  		}
	  		else{
	  			$scope.isDiagramGenerated = false;
	  		}
		}else{

			$scope.isRequestSent = false;
			$scope.isIncomplete = true;
		}
	}

	$scope.submitGrades = function() {

		console.log('inside submitting grades')
		if($scope.selectedTenant == "t001"){
			$scope.tenant2.remarks ='' ;
			$scope.tenant2.percentage ='';
			$scope.tenant3.score = '';
			$scope.tenant4.status = '';
			$scope.tenant4.remarks ='' ;

		}
		else if($scope.selectedTenant == "t002"){

			$scope.tenant1.grade = '';
			$scope.tenant3.score = '';
			$scope.tenant4.status = '';
			$scope.tenant4.remarks ='' ;

		}
		else if($scope.selectedTenant == "t003"){

			$scope.tenant1.grade = '';
			$scope.tenant2.remarks ='' ;
			$scope.tenant2.percentage ='';
			$scope.tenant4.status = '';
			$scope.tenant4.remarks ='' ;

		}
		else if($scope.selectedTenant == "t004"){
			$scope.tenant1.grade = '';
			$scope.tenant2.remarks ='' ;
			$scope.tenant2.percentage ='';
			$scope.tenant3.score = '';
		}

		console.log('Calling API OF SQL')

		console.log(data);

		var data = {
				tenant : $scope.selectedTenant,
				grades : $scope.tenant1.grade,
				remarks : $scope.tenant2.remarks,
				percentage : $scope.tenant2.percentage,
				score : $scope.tenant3.score,
				status : $scope.tenant4.status,
				remarks4 : $scope.tenant4.remarks
			};
			console.log(data);
		$http({
			method: 'POST',
			url: 'http://localhost:3000/grade',
			data : data
		}).then(function successCallback(response) {
			$scope.tenant1.grade = '';
			$scope.tenant2.remarks ='' ;
			$scope.tenant2.percentage ='';
			$scope.tenant3.score = '';
			$scope.tenant4.status = '';
			$scope.tenant4.remarks ='' ;

			console.log(response);
		});
	}
});
