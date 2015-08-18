'use strict';

/**
 * Module dependencies.
 */
var meetings = require('../controllers/meeting.controller');

module.exports = function(app) {
    // Meeting Routes
    app.route('/api/meetings')
        .get(meetings.getAll)
        .post(meetings.create);

    app.route('/api/meetings/:id')
        .get(meetings.getOne)
        .put(meetings.update)
        .delete(meetings.delete);
};
