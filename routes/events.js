var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://stanley:stanley@ds127801.mlab.com:27801/adverse_event_database', ['events']);

// Get All Events
router.get('/events', function(req, res, next){
    var sort = db.events.find().sort({receiveDate:-1});
    sort.limit(100, function(err, events){
        if(err){
            res.send(err);
        }
        res.json(events);
    });
});
// router.get('/events', function(req, res, next){
//     db.events.find( {}, {}, {limit:100}, function(err, events){
//         if(err){
//             res.send(err);
//         }
//         res.json(events);
//     });
// });

// Get Single Event
router.get('/event/:id', function(req, res, next){
    db.events.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, event){
        if(err){
            res.send(err);
        }
        res.json(event);
    });
});

//Save Event
router.post('/event', function(req, res, next){
    var event = req.body;
    if(!event.receiveDate){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.events.save(event, function(err, event){
            if(err){
                res.send(err);
            }
            res.json(event);
        });
    }
});

// Delete Event
router.delete('/event/:id', function(req, res, next){
    db.events.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, event){
        if(err){
            res.send(err);
        }
        res.json(event);
    });
});

// Update Event
router.put('/event/:id', function(req, res, next){
    var event = req.body;
    var updEvent = {};
    
    if(event.isDone){
        updEvent.isDone = event.isDone;
    }
    
    if(event.title){
        updEvent.title = event.title;
    }
    
    if(!updEvent){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.events.update({_id: mongojs.ObjectId(req.params.id)},updEvent, {}, function(err, event){
        if(err){
            res.send(err);
        }
        res.json(event);
    });
    }
});

module.exports = router;