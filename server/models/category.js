var mongoose = require('mongoose'),

CategorySchema = new mongoose.Schema({
	category: {
		type: String,
	},
})

Categories = mongoose.model('Categories', CategorySchema);