angular.module('app', ['ngRoute', 'angular-momentjs'])
.config(function($momentProvider){
	$momentProvider
	.asyncLoading(false)
	.scriptUrl('moment/min/moment.min.js');
})
.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/login.html',
		controller: 'loginController',
		controllerAs: 'loginCtrl',
	})
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html',
		controller: 'dashboardController',
		controllerAs: 'dashboardCtrl'
	})
	.when('/topic/:id', {
		templateUrl: 'partials/showtopic.html',
		controller: 'postController',
		controllerAs: 'postCtrl'
	})
	.when('/user/:id', {
		templateUrl: 'partials/showuser.html',
		controller: 'userController',
		controllerAs: 'userCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
});