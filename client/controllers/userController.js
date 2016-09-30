angular.module('app')
.controller('userController', ['$scope', '$location', 'userFactory', 'postFactory', '$routeParams', function($scope, $location, userFactory, postFactory, $routeParams) {

	var getUser = function(){
		userFactory.getUser($routeParams)
		.then(function(res){
			$scope.user = res;
			postFactory.findUser($routeParams)
			.then(function(res){
				$scope.data = res;
			})
		})
	};
	getUser();

	$scope.logout = function(){
		userFactory.logout()
		$location.url('/');
	}

}]);