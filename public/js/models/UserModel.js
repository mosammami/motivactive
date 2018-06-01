'use strict';

angular.module('App')

.factory('userModel', ['baseModel', function(baseModel) {

	var f = {};

	f.create = function(props) {
		return baseModel.post('/users/create', { props: props });
	};

	f.findById = function(id) {
		return baseModel.post('/users/findById', { id: id });
	};

	f.findall = function() {
		return baseModel.post('/users/findall');
	}

	f.login = function(email, password) {
		return baseModel.post('/users/login', { email: email, password: password });
	};
	
	f.authenticate = function() {
		return baseModel.post('/users/authenticate');
	};

	f.logout = function() {
		return baseModel.post('/users/logout');
	};

	// f.checkUniqueEmail = function(email) {
	// 	return baseModel.post('/users/checkUniqueEmail', { email: email });
	// };

	return f;

}]);