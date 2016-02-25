var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Staff = mongoose.model('Staff');

module.exports = function (app) {
  app.use('/api/staffs', router);
};
// Salut


// POST /api/staffs
router.post('/', function (req, res, next) {
  var staff = new Staff(req.body);
  staff.save(function (err, createdStaff){
    if (err){
      res.status(500).send(err);
      return;
    }
    res.send(createdStaff);
  });
});

// GET /api/staffs
router.get('/', function(req, res, next) {
  Staff.find(function(err, staffs){
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(staffs);
  });
});

// GET /api/staffs/:id
router.get('/:id', function(req, res, next) {
  var staffId = req.params.id;
  Staff.findById(staffId, function(err, staff){
    if (err) {
      res.status(500).send(err);
      return;
    } else if (!staff) {
      res.status(404).send('Staff not found');
      return;
    }
    res.send(staff);
  });
});

// PUT /api/staffs/:id
router.put('/:id', function(req, res, next) {
  var staffId = req.params.id;
  Parson.findById(staffId, function(err, staff){
    if(err) {
      res.status(500).send(err);
      return;
    } else if (!staff) {
      res.status(404).send('Staff not found');
      return;
    }
    staff.name = req.body.name;
    staff.age = req.body.age;
    staff.save(function(err, updatedStaff) {
      if(err) {
        res.status(500).send(err);
        return;
      }
    res.send(updatedStaff);
    });
  });
});

// DELETE /api/staffs/:id
router.delete('/:id', function(req, res, next) {
  var staffId = req.params.id;
  // Staff.findById(staffId, )
  Staff.remove({
    _id: staffId
  },
  function(err) {
    if (err) {
        res.status(500).send(err);
        return;
    }
    console.log('Deleted ' + data.n + ' documents.');
    res.send(204);
  });
});