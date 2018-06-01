var Q = require('q'),
	crypto = require('crypto'),

	User = require('../db/mongoose/models/UserModel'),
	Session = require('../db/mongoose/models/SessionModel'),
	settings = require('../../init/settings'),
    winston = require('../../init/winston'),
	Error = require('../misc/Error'),

    aes = 'aes256',
    sha256 = 'sha256',
    key = settings.AESPrivateKey; 

/***************************/
/* AuthenticationService constructor */
/***************************/
function AuthenticationService() {

};

/******************************/
/* try to encrypt uid + nonce */
/******************************/
function encryptHash(_id, nonce) {
    try {
	    var cipher = crypto.createCipher(aes, key);
	   	return cipher.update(_id + nonce, 'utf8', 'hex') + cipher.final('hex');
    } catch(err) {
    	return '';
    }
};

/***********************/
/* try to decrypt hash */
/***********************/
function decryptHash(hash) {
    try {
	    var decipher = crypto.createDecipher(aes, key),
			decrypted = decipher.update(hash, 'hex', 'utf8') + decipher.final('utf8'),
			_id = decrypted.substring(0, 24),
	    	nonce = parseInt(decrypted.substring(24));
		return {_id: _id, nonce: nonce};
    } catch(err) {
    	return {};
    }
};

/*************************************************************/
/* Check username, password and create session. returns user */
/*************************************************************/
AuthenticationService.prototype.login = function(req, res) {

	var deferred = Q.defer();

	if (typeof req.body.data === 'undefined')
		deferred.reject(new Error('BadRequest', 'You must provide an email and password.'));

	else if (typeof req.body.data.email === 'undefined' || typeof req.body.data.password === 'undefined') 
		deferred.reject(new Error('BadRequest', 'You must provide an email and password.'));

	else {

		var email = req.body.data.email,
			password = req.body.data.password;

	    User.findOne({
	        email: email
	    }, function (error, user) {
        	if (error) deferred.reject(new Error(error));

        	else {

        		// ensure user with specified email exists
	            if (user == null)
                    deferred.reject(new Error('BadRequest', 'The provided email or password is incorrect.'));

                else {
                	// Generate salted, hashed password for comparison
					password = crypto.createHash(sha256).update(password + user.password_salt, "utf8").digest("base64");

					// ensure password is correct
					if (password !== user.password) 
						deferred.reject(new Error('BadRequest', 'The provided email or password is incorrect.'));

					else {

						// create session (login user) and return user data
	                    Session.create({ user_id: user._id.toString() },
	                        function (error, session) {
	                        	if (error) deferred.reject(new Error(error));
	                        	else {
					                var sessionHash = encryptHash(session._id.toString(), session.nonce);
		                            res.header('X-XSRF-TOKEN', sessionHash);

		                            deferred.resolve(user);
		                        }
	                        }
	                    );	                    
	                }
                }
            }
	    });
	};

    return deferred.promise;
};

/*********************************/
/* Authenticates XSRF-TOKEN      */
/* sets req.user and req.session */
/*********************************/
AuthenticationService.prototype.authenticate = function (req, res, next) {

	var hash = req.headers['x-xsrf-token'];

    if (typeof hash === 'undefined' || hash === '') {
		next(new Error('InvalidRequest', 'No x-xsrf-token provided.'));
	}

    else {

	  	var decryptedHash = decryptHash(hash);

	    if (typeof decryptedHash._id === 'undefined' || typeof decryptedHash.nonce === 'undefined') {
			next(new Error('InvalidRequest', 'No session uid or nonce provided.'));
		}

		else if (isNaN(decryptedHash.nonce)) {
			next(new Error('InvalidRequest', 'Bad nonce.'));
		}

	    else {
		    Session.findOne({ _id: decryptedHash._id },
		        function (error, session) {
		        	if (error) next(new Error(error));

		        	else {

		        		// It is not exactly clear what should happend when a session was not found.
		        		// The only case this can happen is when the user manually modified the hash or
		        		// the system deleted the session from the database.
		        		if (session == null)  {
		        			next(new Error('InvalidRequest', 'Session expired.'));
		        		}

			            else if (session.closed) {
							next(new Error('InvalidRequest', 'Session is closed.'));
						}

						// nonce must be no older than 2 requests
			            else if (decryptedHash.nonce - session.nonce < - 2 || decryptedHash.nonce - session.nonce > 0) {
							next(new Error('InvalidRequest', 'Old nonce used.'));
						}

			            else {
			                Session.update({ _id: decryptedHash._id }, { nonce: session.nonce + 1 },
			                    function (error, raw) {
			                    	if (error) next(new Error(error));

			                    	else {
				                        var newHash = encryptHash(decryptedHash._id, session.nonce + 1);

		                        		res.header('X-XSRF-TOKEN', newHash);
				                        req.session = session;

				                        User.findOne({ _id: session.user_id },
				                        	function (error, user) {
				                        		if (error) next(new Error(error));
				                        		// When this happens, then the user must have been deleted whenever after 
				                        		// the session was created with specified user_id
				                        		else if (user == null) 
				                        			next(new Error(
				                        				"InvalidRequest", 
				                        				"Ups, this should not have happened! Please log in again."))
				                        		else {
				                        			req.user = user;
				                        			next();
				                        		}
				                        	}
				                        );
				                    }
			                    }
			                );
			            }
		        	}
		        }
		    );
		}
	}
};

/*********************************/
/* Authenticates XSRF-TOKEN      */
/* sets req.user and req.session */
/* Make sure that middleware     */
/* after this supports unauthen- */
/* ticated users, too. 	  	     */
/*********************************/
AuthenticationService.prototype.optionalAuthenticate = function (req, res, next) {

	var hash = req.headers['x-xsrf-token'];

    if (typeof hash === 'undefined' || hash === '') {
		next();
	}

    else {

	  	var decryptedHash = decryptHash(hash);

	    if (typeof decryptedHash._id === 'undefined' || typeof decryptedHash.nonce === 'undefined') {
			next(new Error('InvalidRequest', 'No session uid or nonce provided.'));
		}

		else if (isNaN(decryptedHash.nonce)) {
			next(new Error('InvalidRequest', 'Bad nonce.'));
		}

	    else {
		    Session.findOne({ _id: decryptedHash._id },
		        function (error, session) {
		        	if (error) next(new Error(error));

		        	else {

		        		// It is not exactly clear what should happend when a session was not found.
		        		// The only case this can happen is when the user manually modified the hash or
		        		// the system deleted the session from the database.
		        		if (session == null)  {
		        			next(new Error('InvalidRequest', 'Session expired.'));
		        		}

			            else if (session.closed) {
							next(new Error('InvalidRequest', 'Session is closed.'));
						}

						// nonce must be no older than 2 requests
			            else if (decryptedHash.nonce - session.nonce < - 2 || decryptedHash.nonce - session.nonce > 0) {
							next(new Error('InvalidRequest', 'Old nonce used.'));
						}

			            else {
			                Session.update({ _id: decryptedHash._id }, { nonce: session.nonce + 1 },
			                    function (error, raw) {
			                    	if (error) next(new Error(error));

			                    	else {
				                        var newHash = encryptHash(decryptedHash._id, session.nonce + 1);

		                        		res.header('X-XSRF-TOKEN', newHash);
				                        req.session = session;

				                        User.findOne({ _id: session.user_id },
				                        	function (error, user) {
				                        		if (error) next(new Error(error));
				                        		// When this happens, then the user must have been deleted whenever after 
				                        		// the session was created with specified user_id
				                        		else if (user == null) 
				                        			next(new Error(
				                        				"InvalidRequest", 
				                        				"Ups, this should not have happened! Please log in again."))
				                        		else {
				                        			req.user = user;
				                        			next();
				                        		}
				                        	}
				                        );
				                    }
			                    }
			                );
			            }
		        	}
		        }
		    );
		}
	}
};

/**********************************/
/* logout closes the user session */
/* first needs to authenticate    */
/**********************************/
AuthenticationService.prototype.logout = function (req, res) {
    winston.info('/users' + req.url);
    
	res.header('X-XSRF-TOKEN', '');

	Session.findByIdAndUpdate(req.session._id, { closed: true }, { new: true },
		function (error, session) {
			if (error) deferred.reject(new Error(error));
			else res.json(session);
		}
	);
};

module.exports = AuthenticationService;