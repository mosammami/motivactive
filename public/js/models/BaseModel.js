'use strict';

angular.module('App')

.factory('baseModel', ['$q', '$http', function($q, $http) {

	var f = {};

	f.post = function(url, data) {

		var deferred = $q.defer();
		var token = localStorage.token || '';
		
		$http.post(
			'http://localhost:3000/api' + url, 
			{ 
				data: data 
			}, 
			{ 
				headers: { 
					'X-XSRF-TOKEN': token,
					'X-Requested-With': 'xmlhttprequest'
				}, 
				withCredentials: true 
			}
		).success(
			function(data, status, headers) {
				
				if (headers('X-XSRF-TOKEN')) {
					localStorage.token = headers('X-XSRF-TOKEN');
				}

				if (data.error) {
					deferred.reject(data.error);
				} else {
					deferred.resolve(data);
				}
	  		}
	  	)
	  	.error(
	  		function(data, status) {
    			deferred.reject(data);
	  		}
	  	);

		return deferred.promise;
	};

	return f;

}]);