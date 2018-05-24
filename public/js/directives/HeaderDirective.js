angular.module('App')

.directive('headerDirective', function() {
	return {
		restrict: 'E',
		templateUrl: '../../assets/directives/header.html'
	};
});