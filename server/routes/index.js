var express = require('express'),
    router = express.Router(),
    auth = require('./auth.js'),
    events = require('./events.js'),
    user = require('./users.js');

/*
* Routes that can be accessed by any one
*/
router.post('/login', auth.login);

/*
* Routes that can be accessed only by autheticated users
*/
router.get('/api/v1/events', events.getAll);
router.get('/api/v1/event/:id', events.getOne);
router.post('/api/v1/event/', events.create);
router.put('/api/v1/event/:id', events.update);
router.delete('/api/v1/event/:id', events.delete);

/*
* Routes that can be accessed only by authenticated & authorized users
*/
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);

module.exports = router;