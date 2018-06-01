var express = require('express'),
    mongoose = require('mongoose'),
    winston = require('../../init/winston'),
    Activity = require('../db/mongoose/models/ActivityModel'),
    AuthenticationService = require('../services/AuthenticationService');

var router = express.Router(),
    authService = new AuthenticationService();

router.post('/find', authService.optionalAuthenticate, function (req, res, next) {
    winston.info('/activites' + req.url);

    Activity.find(JSON.parse(req.body.data), function (err, instances) {
        if (err) next(err);
        else {
            res.json(instances);
        }
    });
});

router.post('/findById', authService.optionalAuthenticate, function (req, res, next) {
    winston.info('/activites' + req.url);

    Activity.findById(req.body.data.id, function (err, instance) {
        if (err) next(err);
        else {
            res.json(instance);
        }
    });
});

router.post('/create', authService.authenticate, function (req, res, next) {
    winston.info('/activites' + req.url);

    Activity.create({
        title:        req.body.data.title,
        description:  req.body.data.description,
        reward:       req.body.data.reward,
        repeated:     req.body.data.repeated,
        due_to:       new Date(parseInt(req.body.data.due_to)).getTime(),
        user_id:      mongoose.Types.ObjectId(req.user._id),
        volunteer_id: req.body.data.volunteer_id != null ? mongoose.Types.ObjectId(req.body.data.volunteer_id) : null,
        categories:   req.body.data.categories
    }, function (err, instance) {
        if (err) next(err);
        else {
            res.json(instance);
        }
    });
});

// IMPORTANT: This is just for populating the database for testing purposes. Delete this in production
router.post('/createMany', authService.authenticate, function (req, res, next) {
    winston.info('/activites' + req.url);
    
    var activities = [];
    for (var i = 0; i < req.body.data.length; i++) {
        activities.push({
            title:        req.body.data[i].title,
            description:  req.body.data[i].description,
            reward:       req.body.data[i].reward,
            repeated:     req.body.data[i].repeated,
            due_to:       new Date(parseInt(req.body.data[i].due_to)).getTime(),
            user_id:      mongoose.Types.ObjectId(req.user._id),
            volunteer_id: req.body.data[i].volunteer_id != null ? mongoose.Types.ObjectId(req.body.data[i].volunteer_id) : null,
            categories:   req.body.data[i].categories
        })
    };
    // console.log(activities);

    Activity.create(activities, function (err, instances) {
        if (err) next(err);
        else {
            res.json(instances);
        }
    });
});

router.post('/delete', authService.authenticate, function (req, res, next) {
    winston.info('/activites' + req.url);
    

    Activity.findOneAndRemove({
        _id: req.body.data._id,
        user_id: req.user._id
    }, function (err, instance) {
        if (err) next(err);
        else {
            res.json({ result: true });
        }
    });
});

// Export router
module.exports = router;