angular.module('App')

.controller('loginController', function($scope, $window, userModel) {
	$scope.email = "";
	$scope.password = "";
	$scope.submitted = false;
	$scope.invalidCredentials = false;
	$scope.somethingWentWrong = false;

	$scope.login = function(isValid) {
		$scope.submitted = true;
		if (isValid) {
			console.log($scope.email + " " + $scope.password);
			$scope.submitted = false;
			$scope.invalidCredentials = false;
			$scope.somethingWentWrong = false;

			// send login query to server
			userModel.login($scope.email, $scope.password).then(
				function (user) {
					console.log(user);
					localStorage.user = JSON.stringify(user);
					$window.location.href = '/';
				},
				function (error) {
					console.log(error);
					$scope.submitted = true;
					if (error.type = "BadRequest") {
						$scope.invalidCredentials = true;
					} else {
						$scope.somethingWentWrong = true;
					}
				}
			);
		}
	};
});