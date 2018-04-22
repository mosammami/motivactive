var mongoose = require('mongoose'),
	String   = mongoose.Schema.Types.String,
	Date 	 = mongoose.Schema.Types.Date,
	Boolean  = mongoose.Schema.Types.Boolean,
	ObjectId = mongoose.Schema.Types.ObjectId;

const ActivitySchema = mongoose.Schema({
	created_at: { type: Date },
	updated_at: { type: Date },
	title: { type: String },
	description: { type: String },
	reward: { type: String },
	due_to: { type: Date },
	repeated: { type: Boolean },
	user_id: { type: ObjectId },
	volunteer_id: { type: ObjectId }
});

ActivitySchema.pre('save', function (next) {
	if (this.isNew) {
		this.created_at = Date.now;
	}
	this.updated_at = Date.now;
	next();
});

module.exports = ActivitySchema;