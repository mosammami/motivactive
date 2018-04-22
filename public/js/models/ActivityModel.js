'use strict';

angular.module('App')

.factory('activityModel', ['baseModel', function(baseModel) {

	var f = {};

	f.create = function(props) {
		return baseModel.post('/activities/create', { props: props });
	};

	f.findall = function() {
		return baseModel.post('/activities/findall');
	}

	return f;

}]);