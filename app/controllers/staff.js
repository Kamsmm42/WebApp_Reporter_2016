var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Staff = mongoose.model('Staff');

module.exports = function (app) {
  app.use('/api/staffs', router);
};

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
  Staff.findById(staffId, function(err, staff){
    if(err) {
      res.status(500).send(err);
      return;
    } else if (!staff) {
      res.status(404).send('Staff not found');
      return;
    }
    staff.name = req.body.name;
    staff.login = req.body.login;
    staff.password = req.body.password;
    staff.email = req.body.email;
    staff.telephone = req.body.telephone;
    staff.city = req.body.city;


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
  function(err, data) {
    if (err) {
        res.status(500).send(err);
        return;
    }
    console.log('Deleted ' + data + ' documents.');
    res.send(204);
  });
});