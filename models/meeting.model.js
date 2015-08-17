'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Meeting Schema
 */
var MeetingSchema = new Schema({
    title: String
    // author: String,
    // body: String,
    // comments: [{
    //     body: String,
    //     date: Date
    // }],
    // date: {
    //     type: Date,
    //     default: Date.now
    // },
    // hidden: Boolean
});

module.exports = mongoose.model('Meeting', MeetingSchema);
