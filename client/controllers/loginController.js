angular.module('app')
.controller('loginController', ['$scope', '$location', 'userFactory', function($scope, $location, userFactory) {

	$scope.regErrors = null;
	$scope.loginErrors = null;

	$scope.register = function(newuser){
		console.log(newuser)
		userFactory.register(newuser)
		.then(
			res=>{
				$scope.regErrors = null;
				$scope.loginErrors = null;
				$location.url('/dashboard');
			},
			err=>{
				$scope.regErrors = err.data.errors.errors;
				$scope.loginErrors = null;
			}
		)	
	};

	$scope.login = function(user){
		userFactory.login(user)
		.then(
			()=>$location.url('/dashboard'),
			err=>{
				$scope.loginErrors = err.data.errors.login_reg.message;
				$scope.regErrors = null;
			}
		)
	};


}]);