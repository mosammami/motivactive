angular.module('App')

.directive('footerDirective', function() {
	return {
		restrict: 'E',
		templateUrl: '../../assets/directives/footer.html'
	};
});