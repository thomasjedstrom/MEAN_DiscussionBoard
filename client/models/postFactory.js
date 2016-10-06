angular.module('app')
.factory('postFactory', ['$http', '$q', 'userFactory', function($http, $q, userFactory) {

	var posts = [];

	function postFactory(){
		var self = this;

////////// httpPromise
		function httpP(req){
			let q = $q.defer();
			req.then(
				res=>(res.data.errors)?q.reject(res):q.resolve(res),
				err=>q.reject(err)
			);
			return q.promise;
		}

////////// Initialize Posts in Factory
		this.index = function(){
			return httpP($http.get('/posts/index'))
			.then(function(ret){
				posts = ret.data
				return ret
			})
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
			return httpP($http.post('/posts/createpost', newpost))
			.then(
				res=>self.index(),
				err=>$q.reject(err)
			)
		};

////////// Create Answer
		this.createAnswer = function(newanswer, id){
			return httpP($http.post('/posts/createanswer/' + id.id, newanswer))
			.then(
				res=>{
					posts = [];
					return res;
				},
				err=>{
					newPromise.err();
					return err;
				}
			)
		}

////////// Create Comment
		this.createComment = function(newcomment, id){
			return httpP($http.post('/posts/createcomment/' + id.id, newcomment))
			.then(
				function(res){
					posts = [];
					return res;
				},
				err=>err
			)
		}

////////// UpVote
		this.upVote = function(post, answer, user){
			// upVote in Posts
			let postPromise = httpP($http.post('/posts/upvote/' + post, answer))
			postPromise.then(
				function(res){
					posts = [];
					return res;
				},
				err=>err
			)
			// upVote in Users
			let userPromise = httpP($http.post('/users/upvote/' + user._id, answer))
			userPromise.then(
				res=>res,
				err=>err
			)
			return Promise.all([postPromise, userPromise]);
		}
////////// DownVote
		this.downVote = function(post, answer, user){
			// upVote in Posts
			let postPromise = httpP($http.post('/posts/downvote/' + post, answer))
			postPromise.then(
				function(res){
					posts = [];
					return res;
				},
				err=>err
			)
			// upVote in Users
			let userPromise = httpP($http.post('/users/downvote/' + user._id, answer))
			userPromise.then(
				res=>res,
				err=>err
			)
			return Promise.all([postPromise, userPromise]);
		}


////////// Destroy
		this.delete = function(id){
			return httpP($http.delete('/posts/delete' + id))
			.then(
				res=>self.index(),
				err=>err
			)
		};
	}
	return new postFactory();
}]);