angular.module('App')

.controller('mainController', function($scope, activityModel) {
	console.log('Hello from the MainController');
	$scope.name = 'Paul';

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