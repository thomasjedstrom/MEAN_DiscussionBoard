angular.module('app')
.factory('userFactory', ['$http', '$q', function($http, $q) {

	var users = [];
	var current_user = {};

	function userFactory(){
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

////////// Initialize Users in Factory
		this.index = function(){
			return httpPromise($http.get('/users/index'))
			newPromise.then(
				ret=>{
					users = ret.data
					return ret
				}
			)
		};

////////// Get a User
		this.getUser = function(idx){
			function findUser(user){
				return user._id == idx.id;
			}
			if(users.length == 0){
				return this.index()
				.then(res=>users.data.find(findUser))
			}else{
				return $q(function(resolve, reject){
					resolve(users.data.find(findUser));
				});
			}
		};

////////// Create
		this.register = function(newuser){
			return httpPromise($http.post('/users/create', newuser))
			.then(
				res=>{
					current_user = res.data.data;
					return self.index();
				}, 
				err=>err
			)
		};

////////// Login
		this.login = function(user){
			return httpPromise($http.post('/users/login', user))
			.then(
				res=>{
					current_user = res.data.data;
					return res;
				}, 
				err=>console.log(err)
			)
		};

////////// Logout
		this.logout = user=>current_user

////////// Get Current User
		this.getCurrentUser = ()=>current_user;

	}
	return new userFactory();
}]);