angular.module('app')
.factory('categoryFactory', ['$http', '$q', function($http, $q) {

	var categories = [];

	function categoryFactory(){
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

////////// Initialize Categorys in Factory
		this.index = function(){
			var newPromise = httpPromise($http.get('/categories/index'))

			newPromise.then(function(ret){
				categories = ret.data
				return ret
			})
			return newPromise
		};
	}
	return new categoryFactory();
}]);