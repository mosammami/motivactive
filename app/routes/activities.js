var express = require('express'),
    mongoose = require('mongoose'),
    winston = require('../../init/winston'),
    Activity = require('../db/mongoose/models/ActivityModel');

var router = express.Router();

router.post('/findall', function (req, res, next) {
    winston.info('/activites' + req.url);

    Activity.find({}, function (err, instances) {
    	if (err) next(err);
    	else {
    		res.json(instances);
    	}
    });
});

router.post('/create', function (req, res, next) {
    winston.info('/activites' + req.url);
    
    Activity.create({
        title:        req.body.title,
        description:  req.body.description,
        reward:       req.body.reward,
        repeated:     req.body.repeated,
        due_to:       new Date(parseInt(req.body.due_to)),
        user_id:      mongoose.Types.ObjectId(req.body.user_id),
        volunteer_id: mongoose.Types.ObjectId(req.body.volunteer_id)
    }, function (err, instance) {
    	if (err) next(err);
    	else {
    		res.json(instance);
    	}
    });
});

// Export router
module.exports = router;