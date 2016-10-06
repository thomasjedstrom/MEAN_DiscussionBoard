require('../models/user.js');
var mongoose 		= require('mongoose'),
	Users 			= mongoose.model('Users'),
	bcrypt			= require('bcrypt');


function usersController(){
	this.index = function(req,res){
		return Users.find({}, (err, result)=>{
			(err) ? res.json({errors: err}) : res.json({data: result});
		})
	};

	this.create = function(req,res){
		console.log(req.body)
		return Users.create(req.body, (err, result)=>{
			(err) ? res.json({errors: err}) : res.json({data: result});
		})
	};

	this.delete = function(req,res){
		Users.remove({"_id": req.params.id}, (err, result)=>{
			(err) ? res.json({errors: err}) : res.json({data: result});
		});
	};

	this.login = function(req,res){
		if(!req.body.email || !req.body.password){
			return res.json({
				errors: {
					login_reg: {
						message: "user name and password is required"
					}
				},
				name: "Validation error"
			});				
		}
		Users.findOne({email: req.body.email}, function(err, result){
			console.log(req.body)
			console.log(result)
			if(err){
				return res.json({errors: err});
			}else if (bcrypt.compareSync(req.body.password, result.password)){
				return res.json({data: result})
			}else{
				return res.json({
					errors: {
						login_reg: {
							message: "user name and/or password is invalid"
						}
					},
					name: "Validation error"
				});		
			}
		});
	};

	this.upVote = function(req,res){
		return Users.findOne({_id: req.params.id}, function(err, result){
			if(err){
				return res.json({errors: err});
			}else{
				result.upvotes.push(req.body._id)
				return res.json({data: result});
			}
		})
	}

	this.downVote = function(req,res){
		return Users.findOne({_id: req.params.id}, function(err, result){
			if(err){
				return res.json({errors: err});
			}else{
				result.downvotes.push(req.body._id)
				return res.json({data: result});
			}
		})
	}
}

module.exports = new usersController();