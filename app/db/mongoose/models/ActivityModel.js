var mongoose = require('mongoose'),
	ActivitySchema = require('../schemas/ActivitySchema');

module.exports = mongoose.model('Activity', ActivitySchema);