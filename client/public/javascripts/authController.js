umlApp.controller('authController', function authController($scope, $rootScope, $location, $http) {

    $scope.user = {};
   	$scope.isNotMatch = false;

    $scope.login = function () {

    	console.log("user : " + $scope.user.username);
    	console.log("pass : " + $scope.user.password);

    	if($scope.user.username === "admin" && $scope.user.password === "admin")
    	{
    		$scope.isNotMatch = false;
    		console.log("Login Successful");
    		$location.path('/grading'); 
        	$location.replace();
   		}
   		else
   		{
   			$scope.isNotMatch = true;
   		}
   	};
});
