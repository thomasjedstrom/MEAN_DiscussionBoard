angular.module('app')
.controller('postController', ['$scope', '$location', 'postFactory', 'userFactory', '$routeParams', function($scope, $location, postFactory, userFactory, $routeParams) {

	$scope.current_user = userFactory.getCurrentUser();

	var getPost = function(){
		postFactory.getPost($routeParams)
		.then(function(res){
			$scope.post = res;
		})
	};
	getPost();

	$scope.createAnswer = function(newAnswer){
		if(Object.keys($scope.current_user).length == 0){
			alert("Sorry, you were logged out, please log back in")
			return $location.url('/');
		}
		newAnswer.user = $scope.current_user;
		postFactory.createAnswer(newAnswer, $routeParams)
		.then(function(res){
			$scope.newAnswer = {};
			getPost();
		})
	};

	$scope.createComment = function(newComment){
		if(Object.keys($scope.current_user).length == 0){
			alert("Sorry, you were logged out, please log back in")
			return $location.url('/');
		}
		// REFORMAT newComment
		var idx = Object.keys(newComment)[0]
		newComment.content = newComment[idx].content;
		delete newComment[idx]
		newComment.answerID = $scope.post.answers[idx]._id;
		newComment.user = $scope.current_user;

		postFactory.createComment(newComment, $routeParams)
		.then(function(res){
			$scope.newComment = {};
			getPost();
		})
	};

	$scope.logout = function(){
		userFactory.logout()
		$location.url('/');
	}


}]);