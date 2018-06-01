var app = angular.module('App', ['ngRoute', 'ngMessages']);

app.config(function($routeProvider) {
	$routeProvider

	// route for the home page
	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'mainController',
	})

	// route for the about page
	.when('/about', {
		templateUrl : 'pages/about.html',
		controller  : 'aboutController'
	})

	// route for the contact page
	.when('/contact', {
		templateUrl : 'pages/contact.html',
		controller  : 'contactController'
	})

	// route for the contact page
	.when('/login', {
		templateUrl : 'pages/login.html',
		controller  : 'loginController'
	})

	// route for the contact page
	.when('/account', {
		templateUrl : 'pages/account.html',
		controller  : 'accountController'
	})

	// route for the contact page
	.when('/forgotpassword', {
		templateUrl : 'pages/forgotpassword.html',
		controller  : 'forgotpasswordController'
	})

	// route for the contact page
	.when('/post', {
		templateUrl : 'pages/createpost.html',
		controller  : 'createPostController'
	})

	// route for the contact page
	.when('/search', {
		templateUrl : 'pages/search.html',
		controller  : 'searchController'
	})

	// route for the contact page
	.when('/activity', {
		templateUrl : 'pages/activity.html',
		controller  : 'activityController'
	})

	// route for the contact page
	.when('/user', {
		templateUrl : 'pages/profile.html',
		controller  : 'profileController'
	})

	// route for anything else that user writes to URI
	.otherwise({redirectTo: '/'});
});
