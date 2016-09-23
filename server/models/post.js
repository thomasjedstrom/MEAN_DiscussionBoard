var mongoose = require('mongoose'),

PostSchema = new mongoose.Schema({

	user: {
		type: Object,
		required: [true, "You are not logged in"],
	},
	topic: {
		type: String,
		required: [true, "A topic is required"],
	},
	description: {
		type: String,
		required: [true, "A description is required"],
	},
	category: {
		type: String,
		required: [true, "A category is required"],
	},


	answers: [
		{user: {
			type: Object,
			required: [true, "You are not logged in"],
		},
		content: {
			type: String,
			required: [true, "You answer cannot be blanks"],
		},
		upvote: {
			type: Number,
			default: 0,
		},
		downvote: {
			type: Number,
			default: 0,
		},
		comments: [{
			user: {
				type: Object,
				required: [true, "You are not logged in"],
			},
			content: {
				type: String,
				required: [true, "You answer cannot be blanks"],
			},
		}, {timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}	
	}]


	}, {timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}],


}, {timestamps: {
	createdAt: 'created_at',
	updatedAt: 'updated_at'
	}
})

Posts = mongoose.model('Posts', PostSchema);