'use strict';

angular.module('App')

.factory('activityModel', ['baseModel', function(baseModel) {

	var f = {};

	f.create = function(properties) {
		return baseModel.post('/activities/create', properties);
	};

	f.find = function(filter) {
		return baseModel.post('/activities/find', filter);
	}

	f.findById = function(id) {
		return baseModel.post('/activities/findById', { id: id });
	}

	return f;

}]);