require('../models/category.js');
var mongoose 		= require('mongoose'),
	Categories		= mongoose.model('Categories');


function categoriesController(){
	this.index = function(req,res){
		return Categories.find({}, function(err, result){
			if(err){
				return res.json({errors: err});
			};
			res.json({data: result});
		})
	};
}

module.exports = new categoriesController();