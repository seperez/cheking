var meetings = {

    getAll: function(req, res) {
        var allMeetings = data; // Spoof a DB call
        res.json(allMeetings);
    },

    getOne: function(req, res) {
        var id = req.params.id;
        var meeting = data[0]; // Spoof a DB call
        res.json(meeting);
    },

    create: function(req, res) {
        var newMeeting = req.body;
        data.push(newMeeting); // Spoof a DB call
        res.json(newMeeting);
    },

    update: function(req, res) {
        var updateMeeting = req.body;
        var id = req.params.id;
        data[id] = updateMeeting // Spoof a DB call
        res.json(updateMeeting);
    },

    delete: function(req, res) {
        var id = req.params.id;
        data.splice(id, 1) // Spoof a DB call
        res.json(true);
    }
};

var data = [
    {
        id: '1'
        name: 'Meeting 1',
    }, 
    {
        id: '2'
        name: 'Meeting 2',
    }, 
    {
        id: '3'
        name: 'Meeting 3',
    }
];

module.exports = meetings;
