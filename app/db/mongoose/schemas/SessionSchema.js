var mongoose = require('mongoose'),
	rand = require("csprng"),
	String   = mongoose.Schema.Types.String,
	Boolean	 = mongoose.Schema.Types.Boolean,
	Number	 = mongoose.Schema.Types.Number;
	ObjectId = mongoose.Schema.Types.ObjectId;

const SessionSchema = mongoose.Schema({
	created_at: { type: Date },
	updated_at: { type: Date },
	closed: 	{ type: Boolean },
	nonce: 		{ type: Number },
	expiry: 	{ type: Date },
	user_id: 	{ type: ObjectId }
});

SessionSchema.pre('save', function (next) {
	if (this.isNew) {
		this.created_at = new Date().getTime();
	    this.nonce = parseInt(rand(32, 10));
	    this.closed = false;
	}
	this.updated_at = new Date().getTime();
	next();
});

module.exports = SessionSchema;