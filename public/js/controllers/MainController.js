angular.module('App')

.controller('mainController', function($scope, activityModel) {
	
	// fresh activities (today)
	activityModel.find(JSON.stringify({
		volunteer_id: null,
		due_to: {
			$lt: new Date().getTime()
		}
	})).then(
		function (activities) {
			$scope.fresh_activities = activities;
		},
		function (error) {
			console.log(error);
		});

	// upcomming activities
	activityModel.find(JSON.stringify({
		volunteer_id: null,
		due_to: {
			$gt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 1).getTime(),
			$lt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7).getTime()
		}
	})).then(
		function (activities) {
			$scope.upcoming_activities = activities;
		},
		function (error) {
			console.log(error);
		});
});