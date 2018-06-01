angular.module('App')

.controller('navigationController', function($scope, $location, $window, userModel) {
	// Check if user is logged in
	$scope.isLoggedIn = false;
	if (localStorage.getItem('user') != null)
		$scope.isLoggedIn = true;

	var links = {
		'home': false,
		'nursing': false,
		'household': false,
		'gardening': false,
		'schooling': false,
		'daily tasks': false,
		'community': false,
		'other': false
	}

	// define which item header is currently active
	$scope.isActive = function (page) {
		// array of all active routes (e.g. when multiple search categories are active)
		// first item is a regular link that is not a search category, like /home or /account
        var activeRoutes = [$location.path().substring(1) || 'home'];

        // look for active search categories
        // looks for /search?c[]=Category1&c[]=Category2&...
        var categories = $location.search()['c[]'];
        if (categories && categories.constructor == Array) {
        	for (category in categories) {
        		activeRoutes.push(category);
        	}
        } else {
        	activeRoutes.push(categories);
        }

       	// if on the home page, delete search params
       	if (activeRoutes.includes('home')) {
       		$scope.searchQueue = "";
       		console.log('lol');
       	}

       	// return "active" for all links that are active
        return activeRoutes.includes(page) ? 'active' : '';
    };

    // define hover events for when mouse hovers over a link
	$scope.enter = function (page) {
        links[page] = true;
    };
	$scope.leave = function (page) {
        links[page] = false;
    };
    $scope.hover = function(page) {
    	return links[page] == true ? 'hover' : '';
    }

    // logout user
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

	$scope.search = function() {
		$window.location.href = '#search?q=' + encodeURIComponent($scope.searchQueue);
	}
});