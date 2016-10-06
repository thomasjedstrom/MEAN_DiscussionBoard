angular.module('app')
.controller('postController', ['$scope', '$location', 'postFactory', 'userFactory', '$routeParams', '$moment', function($scope, $location, postFactory, userFactory, $routeParams, $moment) {

	function checkLogin(){
		if(Object.keys($scope.current_user).length == 0){
			alert("Sorry, you were logged out, please log back in")
			return $location.url('/');
		}
	}

	$scope.current_user = userFactory.getCurrentUser();

	var getPost = function(){
		postFactory.getPost($routeParams)
		.then(function(res){
			$scope.post = res;
		})
	};
	getPost();

	$scope.createAnswer = function(newAnswer){
		if(checkLogin()){
			return
		};
		newAnswer.user = $scope.current_user;
		postFactory.createAnswer(newAnswer, $routeParams)
		.then(function(res){
			$scope.newAnswer = {};
			getPost();
		})
	};

	$scope.createComment = function(answer){
		if(checkLogin()){
			return
		};
		let newComment = {
			answerID: answer._id,
			user: $scope.current_user,
			content: answer.newComment.content
		}
		postFactory.createComment(newComment, $routeParams.id)
		.then(function(res){
			$scope.newComment = {};
			getPost();
		})
	};


	$scope.voteUp = function(answer){
		if(checkLogin()){
			return
		};
		function findAnswer(a){
			return a._id === answer._id
		}
		let x = $scope.post.answers.filter(findAnswer)
		postFactory.upVote($scope.post._id, x[0], $scope.current_user)
		.then(function(res){
			getPost();
		})
	}

	$scope.voteDown = function(answer){
		if(checkLogin()){
			return
		};
		function findAnswer(a){
			return a._id === answer._id
		}
		let x = $scope.post.answers.filter(findAnswer)
		postFactory.downVote($scope.post._id, x[0], $scope.current_user)
		.then(function(res){
			getPost();
		})
	}


	$scope.time = new Date();


	$scope.logout = function(){
		userFactory.logout()
		$location.url('/');
	}
}]);