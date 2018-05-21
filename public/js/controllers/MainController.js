angular.module('App')

.controller('mainController', function($scope, activityModel) {
	// load activities
	activityModel.findall().then(
		function (activities) {
			console.log(activities);
			$scope.activities = activities;
		},
		function (error) {
			console.log(error);
		});
});