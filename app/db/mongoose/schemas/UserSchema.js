var mongoose = require('mongoose'),
	String   = mongoose.Schema.Types.String,
	Date 	 = mongoose.Schema.Types.Date;

const UserSchema = mongoose.Schema({
	created_at: { type: Date },
	updated_at: { type: Date },
	name: { type: String }
});

UserSchema.pre('save', function (next) {
	if (this.isNew) {
		this.created_at = Date.now;
	}
	this.updated_at = Date.now;
	next();
});

module.exports = UserSchema;