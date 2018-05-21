angular.module('App')

.controller('accountController', function($scope, $window, userModel) {

	$scope.logout = function() {
		userModel.logout().then(
			function (success) {
				console.log(success);
				localStorage.removeItem('user');
				localStorage.removeItem('token');
				$window.location.href = '/';
			},
			function (error) {
				// What shall we do when there is an error while logging out?
				// Showing an error message doesn't really make sense in that case...
				console.log(error);
				localStorage.removeItem('user');
				localStorage.removeItem('token');
				$window.location.href = '/';
			}
		);
	};
});