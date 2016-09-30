var mongoose = require('mongoose'),
	uniqueValidator = require('mongoose-unique-validator'),
	bcrypt = require('bcrypt');

UserSchema = new mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		required: [true, "Email is required"],
		unique: [true, "{VALUE} is already in use"],
		validate: {
			validator: function(email){
				return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( email );
			},
			message: `{VALUE} is not a valid email address`
		},
	},
	first_name: {
		type: String,
		required: [true, "Your first name is required"],
		trim: true,
	},
	last_name: {
		type: String,
		required: [true, "Your last name is required"],
		trim: true,
	},
	upvotes: [{
		id: String,
	}],
	downvotes: [{
		id: String,
	}],
	// topics: [{
	// 	id: String,
	// }],
	// post: [{
	// 	id: String,
	// }],
	// comments: [{
	// 	id: String,
	// }],
	password: {
		type: String,
		required: [true, "Password required"],
		minlength: [8, "Password must be at least 8 characters"],
		maxlength: [32, "Password cannot exceed 32 characters"],
		// validate: {
		// 	validator: function( value ) {
		// 		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
		// 	},
		// 	message: "Password failed validation, you must have at least 1 number, uppercase and special character"
		// },	
	},

}, {timestamps: {
	createdAt: 'created_at',
	updatedAt: 'updated_at'
	}
})

Users = mongoose.model('Users', UserSchema);

// Unique Validator
UserSchema.plugin(uniqueValidator, { message: '{VALUE} is already in use'});

// Encrypt Passwords
UserSchema.pre('save', function(done) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    done();
});