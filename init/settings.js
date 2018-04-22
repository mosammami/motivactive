module.exports = {

	// protocol to use
	protocol: 'http',

	// ip of our node server
	ip: 'localhost',

	// port to use
	port: 3000,

	// environment we're in
	environment: 'development',

	// Adapter settings for contacting the database
	database: { 
	    protocol: 	'mongodb',
	    ip: 		'localhost',
	    port: 		27017,
	    database: 	'motivactive', 	
	    username: 	'', 	// not used yet
	    password: 	'',  	// not used yet
		adapter:    'mongoose'
	},
}