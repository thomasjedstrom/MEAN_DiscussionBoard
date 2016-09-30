require('../models/user.js');
var mongoose 		= require('mongoose'),
	Users 			= mongoose.model('Users'),
	bcrypt			= require('bcrypt');


function usersController(){
	this.index = function(req,res){
		return Users.find({}, function(err, result){
			if(err){
				return res.json({errors: err});
			};
			res.json({data: result});
		})
	};

	this.create = function(req,res){
		return Users.create(req.body, function(err, result){
			if(err){
				return res.json({errors: err});
			};
			res.json({data: result});
		})
	};

	this.delete = function(req,res){
		Users.remove({"_id": req.params.id}, function(err, result){
			if(err){
				return res.json({errors: err});
			};
			res.json({data: result});
		});
	};

	this.login = function(req,res){
		if(!req.body.email || !req.body.password){
			return res.json({
				errors: {
					login_reg: {
						message: "user name and password is required",
						kind: "what didn't work",
						path: "reference to the schema's name",
						value: "cause of the initial error"
					}
				},
				name: "Validation error"
			});				
		}
		Users.findOne({email: req.body.email}, function(err, result){
			if(err){
				return res.json({errors: err});
			}else if(result == null) {
				return res.json({
					errors: {
						login_reg: {
							message: "user name and/or password is invalid",
							kind: "what didn't work",
							path: "reference to the schema's name",
							value: "cause of the initial error"
						}
					},
					name: "Validation error"
				});		
			}else if (bcrypt.compareSync(req.body.password, result.password)){
				return res.json({data: result})
			}else{
				console.log("ALL HOPE IS LOST")
			}
		});
	};

	this.upVote = function(req,res){
		return Users.findOne({_id: req.params.id}, function(err, result){
			if(err){
				return res.json({errors: err});
			}else{
				result.upvotes.push(req.body._id)
				return res
			}
			res.json({data: result});
		})
	}
}

module.exports = new usersController();