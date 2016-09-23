angular.module('app')
.controller('dashboardController', ['$scope', '$location', 'userFactory', 'postFactory', 'categoryFactory', '$moment', function($scope, $location, userFactory, postFactory, categoryFactory, $momemt) {

	// for hiding dashboard link
	$scope.dashboard;

	$scope.current_user = userFactory.getCurrentUser();
	$scope.newPost = {};
	$scope.time = new Date();

	var index = function(){
		userFactory.index()
		.then(function(res){
			$scope.users = res.data.data;
		})
		postFactory.index()
		.then(function(res){
			$scope.posts = res.data.data;
		})
		categoryFactory.index()
		.then(function(res){
			$scope.categories = res.data.data;
		})
	};
	index();

	$scope.createPost = function(newPost){
		if(Object.keys($scope.current_user).length == 0){
			alert("Sorry, you were logged out, please log back in")
			return $location.url('/');
		}
		newPost.user = {};
		newPost.user.name = $scope.current_user.first_name;
		newPost.user.id = $scope.current_user._id;
		if(newPost.category){
			newPost.category = $scope.categories[newPost.category].category	
		}
		postFactory.createPost(newPost)
		.then(
			function(res){
				index();
			},
			function(err){
				$scope.topicErrors = err.data.errors.errors
			}
		)
		$scope.newPost = {};
	}

	$scope.logout = function(){
		userFactory.logout()
		$location.url('/');
	}

}]);