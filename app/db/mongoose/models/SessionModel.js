var mongoose = require('mongoose'),
	SessionSchema = require('../schemas/SessionSchema');

module.exports = mongoose.model('Session', SessionSchema);