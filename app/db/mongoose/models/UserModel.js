var mongoose = require('mongoose'),
	UserSchema = require('../schemas/UserSchema');

module.exports = mongoose.model('User', UserSchema);