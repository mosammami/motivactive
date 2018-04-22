var winston = require('winston'),
	transports = [];

var info = new winston.Logger({
	transports: [
		new winston.transports.DailyRotateFile({
			level: 'info',
			name: 'info',
			datePattern: '.yyyy-MM-dd', // We can even get it creating new log files by hour by adding 'HH', e.g. '.yyyy-MM-ddTHH'
			filename: "logs/info_log"
		}),
		new winston.transports.Console({
			level: 'info',
			colorize: true
		})
	]
});

var error = new winston.Logger({
	transports: [
		new winston.transports.DailyRotateFile({
			level: 'error',
			name: 'error',
			datePattern: '.yyyy-MM-dd', // We can even get it creating new log files by hour by adding 'HH', e.g. '.yyyy-MM-ddTHH'
			filename: "logs/error_log"
		}),
		new winston.transports.Console({
			level: 'error',
			colorize: true
		})
	],
	exitOnError: false
});

var profile = new winston.Logger({
	transports: [
		new winston.transports.DailyRotateFile({
			level: 'debug',
			name: 'profile',
			datePattern: '.yyyy-MM-dd', // We can even get it creating new log files by hour by adding 'HH', e.g. '.yyyy-MM-ddTHH'
			filename: "logs/profile_log"
		})
	]
});

module.exports = {
	info: function(message, params) {
		if (!params) info.info(message);
		else info.info(message, params);
	},
	error: function(message, params) {
		if (!params) error.error(message);
		else error.error(message, params);
	},
	profile: function(message, params) {
		if (!params) profile.profile(message);
		else profile.profile(message, params);
	}
};