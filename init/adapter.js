var settings = require('./settings');
var Adapter = require('../app/db/AdapterSettings')(settings.adapter).adapter;

module.exports = new Adapter(settings.database);