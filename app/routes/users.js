var express = require('express'),
    winston = require('../../init/winston'),
    User = require('../db/mongoose/models/UserModel');

var router = express.Router();

router.post('/findall', function (req, res, next) {
    winston.info('/users' + req.url);

    User.find({}, function (err, instances) {
    	if (err) next(err);
    	else {
    		res.json(instances);
    	}
    });
});

router.post('/create', function (req, res, next) {
    winston.info('/users' + req.url);

    User.create({
    	name: req.body.name
    }, function (err, instance) {
    	if (err) next(err);
    	else {
    		res.json(instance);
    	}
    });
});

// Export router
module.exports = router;