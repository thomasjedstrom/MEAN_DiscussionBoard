var users	 	= require('../controllers/users.js'),
	posts		= require('../controllers/posts.js'),
	categories	= require('../controllers/categories.js');

module.exports = function(app){
	app.get('/users/index', users.index);
	app.post('/users/create', users.create);
	app.post('/users/login', users.login);
	app.post('/users/delete/:id', users.delete);

	app.get('/posts/index', posts.index);
	app.post('/posts/createpost', posts.createPost);
	app.post('/posts/createanswer/:id', posts.createAnswer);
	app.post('/posts/createcomment/:id', posts.createComment);

	// UpVotes
	app.post('/posts/upvote/:id', posts.upVote);
	app.post('/users/upvote/:id', users.upVote);

	// DownVotes
	app.post('/posts/downvote/:id', posts.downVote);
	app.post('/users/downvote/:id', users.downVote);

	app.get('/categories/index', categories.index);
}