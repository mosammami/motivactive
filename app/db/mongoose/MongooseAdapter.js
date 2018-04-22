var settings = require('../../../init/settings'),
    mongoose = require('mongoose');

function MongooseAdapter(settings) {

    if (!settings)          settings            = {};
    if (!settings.protocol) settings.protocol   = 'mongodb';
    if (!settings.ip)       settings.ip         = 'localhost';
    if (!settings.port)     settings.port       = 27017;
    if (!settings.database) settings.database   = 'default';
    if (!settings.username) settings.username   = '';
    if (!settings.password) settings.password   = '';

    this.settings = settings;

    // Url for mongoDb
    var credentials = "";
    if (this.settings.username && this.settings.password) credentials = this.settings.username + ':' + this.settings.password + '@';
    var url = this.settings.protocol + '://' + credentials + this.settings.ip + ':' + this.settings.port + '/' + this.settings.database;

    mongoose.connect(url);
    this.db = mongoose.connection;
};

// Export adapter
module.exports = MongooseAdapter;