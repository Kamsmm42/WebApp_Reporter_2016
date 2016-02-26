var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Type = mongoose.model('Type');
  Staff = mongoose.model('Staff');
  
module.exports = function (app) {
  app.use('/api/types', router);
};

// fonction pour vérifier si le user est un Staff 
// middlewhere identification

// attention ! body 
function checkStaffExists(req, res, next){
  Staff.findById(req.body.staffIdentity, function(err, existingStaff){
    if (err){
      res.status(500).send(err);
    return;
    } else if (!existingStaff){
        res.status(404).send('You are not authorised to be here');
      return;
    }
    req.staff = existingStaff;

    next();
  });
}

// POST /api/types
router.post('/',checkStaffExists, function (req, res, next) {
  var type = new Type(req.body);
  type.save(function (err, createdType){
    if (err){
      res.status(500).send(err);
      return;
    }
    res.send(createdType);
  });
});

// GET /api/types
router.get('/', function(req, res, next) {
  Type.find(function(err, types){
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(types);
  });
});

// GET /api/types/:id
router.get('/:id', function(req, res, next) {
  var typeId = req.params.id;
  Type.findById(typeId, function(err, type){
    if (err) {
      res.status(500).send(err);
      return;
    } else if (!type) {
      res.status(404).send('Type not found');
      return;
    }
    res.send(type);
  });
});

// PUT /api/types/:id
router.put('/:id',checkStaffExists, function(req, res, next) {
  var typeId = req.params.id;
  Type.findById(typeId, function(err, type){
    if(err) {
      res.status(500).send(err);
      return;
    } else if (!type) {
      res.status(404).send('Type not found');
      return;
    }
    type.name = req.body.name;
    type.description = req.body.description;

    type.save(function(err, updatedType) {
      if(err) {
        res.status(500).send(err);
        return;
      }
    res.send(updatedType);
    });
  });
});

// DELETE /api/types/:id
router.delete('/:id',checkStaffExists, function(req, res, next) {
  var typeId = req.params.id;
  // Type.findById(typeId, )
  Type.remove({
    _id: typeId
  },
  function(err, data) {
    if (err) {
        res.status(500).send(err);
        return;
    }
    console.log('Deleted ' + data.n + ' documents.');
    res.send(204);
  });
});