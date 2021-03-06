var express = require('express'),
    router = express.Router(),
    auth = require('./auth.js'),
    meetings = require('../controllers/meeting.controller'),
    user = require('./users.js');

/*
* Routes that can be accessed by any one
*/
router.post('/login', auth.login);

/*
* Routes that can be accessed only by autheticated users
*/
router.get('/api/meetings', meetings.getAll);
router.get('/api/meeting/:id', meetings.getOne);
router.post('/api/meeting/', meetings.create);
router.put('/api/meeting/:id', meetings.update);
router.delete('/api/meeting/:id', meetings.delete);

/*
* Routes that can be accessed only by authenticated & authorized users
*/
router.get('/api/admin/users', user.getAll);
router.get('/api/admin/user/:id', user.getOne);
router.post('/api/admin/user/', user.create);
router.put('/api/admin/user/:id', user.update);
router.delete('/api/admin/user/:id', user.delete);

module.exports = router;
