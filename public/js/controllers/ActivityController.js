angular.module('App')

.controller('activityController', function($scope, $window, $location, activityModel, userModel) {
	
	// fresh activities (today)
	activityModel.findById($location.search()['id'])
	.then(
		function (activity) {
			console.log(activity);
			$scope.activity = activity;

			userModel.findById(activity.user_id).then(
				function (user) {
					console.log(user);
					$scope.user = user;
				},
				function (error) {
					console.log(error);
				}
			);
		},
		function (error) {
			console.log(error);
		}
	);

	$scope.onProfileClicked = function(user) {
		console.log(user);
		$window.location.href = '#user?id=' + encodeURIComponent(user._id);
	}
});