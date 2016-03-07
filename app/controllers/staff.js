var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Staff = mongoose.model('Staff');

module.exports = function (app) {
  app.use('/api/staffs', router);
};

/**
 * Function to verify that staffIdentity is provided and valid
 */
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

/**
 * @api {post} /api/staffs Create a new Staff
 * @apiVersion 0.1.0
 * @apiName PostStaff
 * @apiGroup Staff
 * @apiPermission admin
 *
 * @apiDescription Create a new Staff only if you're a staff member.
 *
 * @apiSuccess {String}   staff.name          Staff Name.
 * @apiSuccess {String}   staff.login         Staff login.
 * @apiSuccess {String}   staff.password      Staff password.
 * @apiSuccess {String}   staff.email         Staff email.
 * @apiSuccess {Number}   staff.telephone     Staff telephone.
 * @apiSuccess {String}   staff.city          Staff city.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name":        "Kevin",
 *       "login":       "Salut2016",
 *       "password":    "12345",
 *       "email":       "cestdurelavie@hotmail.com",
 *       "telephone":   "000333222",
 *       "city":        "Lausanne"
 *     }
 *
 * @apiError NoAccessRight Only authenticated Admins can create the data.
 *
 * @apiComment CreateStaff
 */

// POST /api/staffs 
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


/**
 * @api {get} /staffs/:id Read data of all Staff
 * @apiVersion 0.1.0
 * @apiName GetAllStaff
 * @apiGroup Staff
 * @apiPermission none
 *
 * @apiDescription This function read a specific all Staff.
 *
 * @apiSuccess {String}   staff.name          Staff Name.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name":        "Kevin", 
 *       "name":        "Jorde", 
 *       "name":        "Alice", 
 *       "name":        "Nico"
 *     }
 *
 * @apiError StaffNotFound   The <code>id</code> of the Type was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Staff not found"
 *     }
 */

// GET /api/staffs
router.get('/', function(req, res, next) {

  // Create search criteria.. 
      var criteria = {};
      // TO DO: Search criteria by most Issues..
      /*
      // Search criteria by tags..
      if(typeof(req.query.tags) == "object" && req.query.tags.length) {
          criteria.tags= {$in:req.query.tags};
      } else if (req.query.tags){
          criteria.tags=req.query.tags;
      }
      
      // Search criteria by authorname..
      if(typeof(req.query.authorname) == "object" && req.query.authorname.length) {
          criteria.authorname= {$in:req.query.authorname};
      } else if (req.query.authorname){
          criteria.authorname=req.query.authorname;
      }
      */

  // Pagination of Staffs..
      var page = req.query.page ? parseInt(req.query.page, 10) : 1,
        pagesize = req.query.pagesize ? parseInt(req.query.pagesize, 10) : 30;

      var offset = (page-1)*pagesize, 
        limit = pagesize;

      // Count number of Staffs..
      Staff.count(function(err,totalCount){
        if (err){
            console.log('erreur total count');
            res.status(500).send(err);
            return;
        }
        // Count number of Staffs filtered by search criteria.. 
        Staff.count(criteria, function(err, filteredCount){
          if (err){
            console.log('erreur filter count');
            res.status(500).send(err);
            return;
          }
          // Set pagination info in header..
          res.set('X-Pagination-Page', page);
          res.set('X-Pagination-Page-Size', pagesize);
          res.set('X-Pagination-Total', totalCount);
          res.set('X-Pagination-Filtered-Total', filteredCount);
          // Send query..
            Staff.find(criteria)
              .sort('name')
              .skip(offset)
              .limit(limit)
              .exec(function(err, Staff){
                if (err) {
                  res.status(500).send(err);
                  return;
                }
                res.send(Staff);
              });
          });
      });
});

/**
 * @api {get} /staffs/:id Read data of a Staff
 * @apiVersion 0.1.0
 * @apiName GetStaff
 * @apiGroup Staff
 * @apiPermission none
 *
 * @apiDescription This function read a specific Staff with his id.
 * 
 * @apiParam {Number} id        The Staff-ID.
 *
 * @apiSuccess {String}   staff.name          Staff Name.
 * @apiSuccess {String}   staff.login         Staff login.
 * @apiSuccess {String}   staff.password      Staff password.
 * @apiSuccess {String}   staff.email         Staff email.
 * @apiSuccess {Number}   staff.telephone     Staff telephone.
 * @apiSuccess {String}   staff.city          Staff city.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name":        "Kevin",
 *       "login":       "Salut2016",
 *       "password":    "12345",
 *       "email":       "cestdurelavie@hotmail.com",
 *       "telephone":   "000333222",
 *       "city":        "Lausanne"
 *     }
 *
 * @apiError NoAccessRight Only authenticated Admins can change the data.
 * @apiError StaffNotFound   The <code>id</code> of the Type was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Staff not found"
 *     }
 */

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

/**
 * @api {put} /staffs/:id Change a Staff
 * @apiVersion 0.1.0
 * @apiName PutStaff
 * @apiGroup Staff
 * @apiPermission admin
 *
 * @apiDescription This function change a Staff
 *
 * @apiParam {Number} id The Staff-ID.
 *
 * @apiSuccess {String}   staff.name          Staff Name.
 * @apiSuccess {String}   staff.login         Staff login.
 * @apiSuccess {String}   staff.password      Staff password.
 * @apiSuccess {String}   staff.email         Staff email.
 * @apiSuccess {Number}   staff.telephone     Staff telephone.
 * @apiSuccess {String}   staff.city          Staff city.
 *
 * @apiError NoAccessRight Only authenticated Admins can change the data.
 * @apiError StaffNotFound  The <code>id</code> of the Staff was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 404 NoAccessRight
 *     {
 *       "error": "Staff can not change. You haven't the right"
 *     }
 */

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
    // Save Staff...
    staff.save(function(err, updatedStaff) {
      if(err) {
        res.status(500).send(err);
        return;
      }
    res.send(updatedStaff);
    });
  });
});



/**
 * @api {delete} /staffs/:id Delete data of a Staff
 * @apiVersion 0.1.0
 * @apiName DeleteStaff
 * @apiGroup Staff
 * @apiPermission admin
 * 
 * @apiDescription This function for delete a Staff 
 * 
 * @apiParam {Number} id        The Staff-ID.
 *
 * @apiError NoAccessRight Only authenticated Admins can delete the data.
 * @apiError StaffNotFound   The <code>id</code> of the Staff was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 404 NoAccessRight
 *     {
 *       "error": "Staff can not delete. You haven't the right"
 *     }
 */

// DELETE /api/staffs/:id
router.delete('/:id',checkStaffExists, function(req, res, next) {
  var staffId = req.params.id;
  // TO DO : Staff.findById(staffId, )
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