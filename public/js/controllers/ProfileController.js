angular.module('App')

.controller('profileController', function($scope, $location, userModel) {
	
	// fresh activities (today)
	userModel.findById($location.search()['id'])
	.then(
		function (user) {
			console.log(user);
			$scope.user = user;
		},
		function (error) {
			console.log(error);
		}
	);
});