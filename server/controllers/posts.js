require('../models/post.js');
var mongoose 		= require('mongoose'),
	Posts			= mongoose.model('Posts');


function postsController(){
	this.index = function(req,res){
		return Posts.find({}, function(err, result){
			if(err){
				return res.json({errors: err});
			};
			res.json({data: result});
		})
	};

	this.createPost = function(req,res){
		return Posts.create(req.body, function(err, result){
			if(err){
				return res.json({errors: err});
			};
			res.json({data: result});
		})
	};

	this.createAnswer = function(req,res){
		return Posts.findOne({_id: req.params.id}, function(err, result){
			if(err){
				return res.json({errors: err});
			}else{
				result.answers.push(req.body);
				result.save();
				return res.json({data: result})
			}
		})
	};

	this.createComment = function(req,res){
		return Posts.findOne({_id: req.params.id}, function(err, result){
			if(err){
				return res.json({errors: err});
			}else{
				function findAnswer(answer){
					return answer._id == req.body.answerID;
				}
				// Find the answer in the post
				var idx = result.answers.findIndex(findAnswer)
				// Delete the answerID, doesn't need to be stored
				delete req.body.answerID
				// Push the comment to the answer's array of comments
				result.answers[idx].comments.push(req.body);
				result.save();
				return res.json({data: result})
			}
		})
	};

	this.upVote = function(req,res){
		console.log("CONTROLLER 1")
		console.log(req.body)
		return Posts.findOne({_id: req.params.id}, function(err, result){
			if(err){
				console.log("CONTROLLER 2")
				return res.json({errors: err});
			}else{
				console.log("CONTROLLER 3")
				function findAnswer(answer){
					return answer._id == req.body._id;
				}
				// Find the answer in the post
				var idx = result.answers.findIndex(findAnswer)

				// Increment upVote
				result.answers[idx].upvote += 1;

				result.save();
				return res.json({data: result})
			}
		})
	}
}

module.exports = new postsController();