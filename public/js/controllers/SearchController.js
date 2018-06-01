angular.module('App')

.controller('searchController', function($scope, $location, activityModel) {
	
	// get search params from URL
	var searchString = $location.search()['q']
	var categories = $location.search()['c[]']

	var queueParameters = {
		volunteer_id: null
	};

	// add title search to params
	if (searchString) {
		var split = searchString.split(' ');
		if (split.length > 0) {
			queueParameters['title'] = {
				$regex: split.join('|')
			};
		}
	}

	// fresh activities (today)
	activityModel.find(JSON.stringify(queueParameters)).then(
		function (activities) {
			console.log(activities);
			$scope.activities = activities;
		},
		function (error) {
			console.log(error);
		});
})