angular.module('app')
.controller('loginController', ['$scope', '$location', 'userFactory', function($scope, $location, userFactory) {

	$scope.regErrors = null;
	$scope.loginErrors = null;
	$scope.newuser = {};
	$scope.newuser.confirm_password = '';

	$scope.register = function(newuser){
		if($scope.newuser.password){
			if($scope.newuser.password != $scope.newuser.confirm_password){
				 return $scope.regErrors = {password_validation:{message: "Password didn't match Confirm Password"}}
			}
		}
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