angular.module('app')
.factory('categoryFactory', ['$http', '$q', function($http, $q) {

	var categories = [];

	function categoryFactory(){
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

////////// Initialize Categorys in Factory
		this.index = function(){
			return httpP($http.get('/categories/index'))
			.then(function(ret){
				categories = ret.data
				return ret
			})
		};
	}
	return new categoryFactory();
}]);