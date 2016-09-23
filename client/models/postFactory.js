angular.module('app')
.factory('postFactory', ['$http', '$q', 'userFactory', function($http, $q, userFactory) {

	var posts = [];

	function postFactory(){
		var self = this;

////////// httpPromise
		function httpPromise(httpRequest){
			var myPromise = $q.defer();
			httpRequest.then(
				function(res){
					if(res.data.errors){
						return myPromise.reject(res);
					}else{
						return myPromise.resolve(res);
					}
				},
				function(err){
					myPromise.reject(err);
				}
			);
			return myPromise.promise;
		}

////////// Initialize Posts in Factory
		this.index = function(){
			var newPromise = httpPromise($http.get('/posts/index'))

			newPromise.then(function(ret){
				posts = ret.data
				return ret
			})
			return newPromise
		};

////////// Get a Post
		this.getPost = function(idx){
			function findPost(post){
				return post._id == idx.id;
			}
			if(posts.length == 0){
				return this.index()
				.then(function(res){
					return posts.data.find(findPost)
				})
			}else{
				return $q(function(resolve, reject){
					resolve(posts.data.find(findPost));
				});
			}
		};

////////// Find a User
		this.findUser = function(idx){
			function findTopics(post){
				return ((post.user.id == idx.id) || (post.user._id == idx.id))
			}
			function findPosts(){
				var count = []
				for(x in posts.data){
					count.push(posts.data[x].answers.filter(findTopics))
				}
				var newCount = [].concat.apply([], count);
				return newCount.length;
			}
			function findComments(post){
				var count = [];
				for(x in posts.data){
					for(y in posts.data[x].answers){
						count.push(posts.data[x].answers[y].comments.filter(findTopics))
					}
				}
				var newCount = [].concat.apply([], count);
				return newCount.length
			}
			
			if(posts.length == 0){
				return this.index()
				.then(function(res){
					var data = {};
					data.topics = posts.data.filter(findTopics).length
					data.posts = findPosts();
					data.comments = findComments();
					return data
				})
			}else{
				return $q(function(resolve, reject){
					var data = {};
					data.topics = posts.data.filter(findTopics).length
					data.posts = findPosts();
					data.comments = findComments();
					resolve(data)
				});
			}
		}

////////// Create Post
		this.createPost = function(newpost){
			var newPromise = httpPromise($http.post('/posts/createpost', newpost))

			newPromise.then(
				function(res){
					return self.index();
				},
				function(err){
					return err;
				})
			return newPromise;
		};

////////// Create Answer
		this.createAnswer = function(newanswer, id){
			var newPromise = httpPromise($http.post('/posts/createanswer/' + id.id, newanswer))

			newPromise.then(
				function(res){
					posts = [];
					return res;
				},
				function(err){
					newPromise.err();
					return err;
				})
			return newPromise;
		}

////////// Create Comment
		this.createComment = function(newcomment, id){
			var newPromise = httpPromise($http.post('/posts/createcomment/' + id.id, newcomment))

			newPromise.then(
				function(res){
					posts = [];
					return res;
				},
				function(err){
					return err;
				})
			return newPromise;
		}


////////// Destroy
		this.delete = function(id){
			var newPromise = httpPromise($http.delete('/posts/delete' + id))
			newPromise.then(
				function(res){
					self.index();
				},
				function(err){
					return err;
				})
			return newPromise; 
		};
	}
	return new postFactory();
}]);