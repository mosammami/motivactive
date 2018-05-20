var mongoose = require('mongoose'),
	crypto = require("crypto"),
	String   = mongoose.Schema.Types.String;

const UserSchema = mongoose.Schema({
	created_at:    { type: Date },
	updated_at:    { type: Date },
	first_name:    { type: String },
	last_name:     { type: String },
	email:         { type: String },
	password:      { type: String },
	password_salt: { type: String }
});

UserSchema.pre('save', function (next) {
	if (this.isNew) {
		this.created_at = new Date().getTime();
   		this.password_salt = new Date().getTime();
    	this.password = crypto.createHash("sha256").update(this.password + this.password_salt, "utf8").digest("base64");
	}
	this.updated_at = new Date().getTime();
	next();
});

module.exports = UserSchema;