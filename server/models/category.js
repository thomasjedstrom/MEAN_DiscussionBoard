var mongoose = require('mongoose'),

CategorySchema = new mongoose.Schema({
	categroy: {
		type: String,
	},
})

Categories = mongoose.model('Categories', CategorySchema);