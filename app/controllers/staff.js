var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Staff = mongoose.model('Staff');

module.exports = function (app) {
  app.use('/api/staffs', router);
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

// POST /api/staffs 
// création de staff
router.post('/', checkStaffExists, function (req, res, next) {
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

  // création d'un critère de recherche 
      var criteria = {};
      // TO DO 
      //critère recherche par nombre de most Issues
      /*
      if(typeof(req.query.tags) == "object" && req.query.tags.length) {
          criteria.tags= {$in:req.query.tags};
      } else if (req.query.tags){
          criteria.tags=req.query.tags;
      }
      
      //critère recherche pour authorname
      if(typeof(req.query.authorname) == "object" && req.query.authorname.length) {
          criteria.authorname= {$in:req.query.authorname};
      } else if (req.query.authorname){
          criteria.authorname=req.query.authorname;
      }
      */

  // Pagination de Issues

      var page = req.query.page ? parseInt(req.query.page, 10) : 1,
        pagesize = req.query.pagesize ? parseInt(req.query.pagesize, 10) : 30;

      var offset = (page-1)*pagesize, 
        limit = pagesize;

      // compte du nombre de Issues
      Staff.count(function(err,totalCount){
        if (err){
            console.log('erreur total count');
            res.status(500).send(err);

            return;
        }
        // compte la quantité selon critère 
        Staff.count(criteria, function(err, filteredCount){
          if (err){
            console.log('erreur filter count');
            res.status(500).send(err);
            return;
          }

          // donne l'info dans le header
          res.set('X-Pagination-Page', page);
          res.set('X-Pagination-Page-Size', pagesize);
          res.set('X-Pagination-Total', totalCount);
          res.set('X-Pagination-Filtered-Total', filteredCount);

          // envoi de la requete
            Staff.find(criteria)
              .sort('name')
              .skip(offset)
              .limit(limit)
              .exec(function(err, Staff){
                if (err) {
                  res.status(500).send(err);
                  return;
                }

                console.log(req.query.name);
                res.send(Staff);
              });
          });
      });










  /*Original
  Staff.find(function(err, staffs){
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(staffs);
  });
  */




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
router.put('/:id',checkStaffExists, function(req, res, next) {
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
router.delete('/:id',checkStaffExists, function(req, res, next) {
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