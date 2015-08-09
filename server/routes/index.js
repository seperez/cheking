var express = require('express'),
    router = express.Router(),
    auth = require('./auth.js'),
    events = require('./meetings.js'),
    user = require('./users.js');

/*
* Routes that can be accessed by any one
*/
router.post('/login', auth.login);

/*
* Routes that can be accessed only by autheticated users
*/
router.get('/api/v1/meetings', meetings.getAll);
router.get('/api/v1/meeting/:id', meetings.getOne);
router.post('/api/v1/meeting/', meetings.create);
router.put('/api/v1/meeting/:id', meetings.update);
router.delete('/api/v1/meeting/:id', meetings.delete);

/*
* Routes that can be accessed only by authenticated & authorized users
*/
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);

module.exports = router;