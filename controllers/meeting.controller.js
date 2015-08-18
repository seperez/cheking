'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Meeting = require('../models/meeting.model');

/**
 * Methods
 */
exports.getAll = function(req, res) {
    console.log('Entra');
    Meeting
        .find()
        .exec(function(err, meetings) {
            if (err) {
                res.status(400).json({ message: 'Error!' });
            } else {
                res.status(200).json(meetings || []);
            }
        });
}

exports.getOne = function(req, res) {
    var id = req.params.id;

    Meeting
        .findById(id)
        .exec(function(err, meeting) {
            if (err) {
                res.status(400).json({ message: 'Error!' });
            } else {
                res.status(200).json(meeting || {});
            }
        });
}

exports.create = function(req, res) {
    var newMeeting = new Meeting(req.body);

    newMeeting.save(function(err) {
        if (err) {
            res.status(400).json({ message: 'Error!' });
        } else {
            res.status(201).json(newMeeting || {});
        }
    });
}

exports.update = function(req, res) {
    var id = req.params.id,
        updateMeeting = req.body;

    Meeting.findByIdAndUpdate(id, { $set: updateMeeting}, function(err, meeting) {
        if (err) {
            res.status(400).json({ message: 'Error!' });
        } else {
            res.status(200).json(meeting || {});
        }
    });
}

exports.delete = function(req, res) {
    var id = req.params.id;

    Meeting.findByIdAndRemove(id, function(err, meeting) {
		if (err) {
			res.status(400).json({ message: 'Error!' });
		} else {
			res.status(200).json(meeting || {});
		}
	});
}
