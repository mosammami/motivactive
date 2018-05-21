angular.module('App')

.controller('navigationController', function($scope, $location) {
	// Check if user is logged in
	$scope.isLoggedIn = false;
	if (localStorage.getItem('user') != null)
		$scope.isLoggedIn = true;

	console.log($scope.isLoggedIn);
	
	// define which item header is currently active
	$scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
    };
});