var express = require('express'),
    winston = require('../../init/winston'),
    User = require('../db/mongoose/models/UserModel'),
    Session = require('../db/mongoose/models/SessionModel'),
    AuthenticationService = require('../services/AuthenticationService');

var router = express.Router(),
    authService = new AuthenticationService();

router.post('/findall', function (req, res, next) {
    winston.info('/users' + req.url);

    User.find({}, function (error, instances) {
    	if (error) next(error);
    	else {
    		res.json(instances);
    	}
    });
});

router.post('/findById', authService.optionalAuthenticate, function (req, res, next) {
    winston.info('/users' + req.url);

    User.findById(req.body.data.id, function (err, instance) {
        if (err) next(err);
        else {
            res.json(instance);
        }
    });
});

router.post('/create', function (req, res, next) {
    winston.info('/users' + req.url);

    User.create({
        first_name: req.body.data.first_name,
        last_name:  req.body.data.last_name,
        password:   req.body.data.password,
        email:      req.body.data.email
    }, function (error, instance) {
        if (error) next(error);
        else {
            res.json(instance);
        }
    });
});

router.post('/delete', authService.authenticate, function (req, res, next) {
    winston.info('/users' + req.url);

    // delete user
    User.deleteOne({
        _id: req.user._id
    }, function (error) {
        if (error) next(error);
        else {
            // delete all sessions that were saved for this user
            Session.remove({ user_id: req.user._id },
                function(error) {
                    // do not care about error when deleting sessions
                    res.json({ result: true });
                }
            );
        }
    });
});

/************************/
/*** Login and Logout ***/
/************************/

router.post('/login', function (req, res, next) {
    winston.info('/users' + req.url);

    authService.login(req, res).then(
        function(user) {
            res.json(user);
        },
        function(error) {
            next(error);
        }
    );
});
router.post('/logout', authService.authenticate, authService.logout);

module.exports = router;