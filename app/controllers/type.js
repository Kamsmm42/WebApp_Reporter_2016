var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Type = mongoose.model('Type'),
  Staff = mongoose.model('Staff');
  
module.exports = function (app) {
  app.use('/api/types', router);
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
 * @api {post} /api/type Create a new type
 * @apiVersion 0.1.0
 * @apiName PostType
 * @apiGroup Type
 * @apiPermission admin
 *
 * @apiDescription Create a new type only if you're a staff member.
 *
 * @apiSuccess {String}   type.name          Option Name.
 * @apiSuccess {String}   type.description   Option Description.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "graffiti",
 *       "description": "dégradation de mur"
 *     }
 *
 * @apiError NoAccessRight Only authenticated Admins can create the data.
 *
 * @apiComment CreateType
 */

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


/**
 * @api {get} /type Read data of all type
 * @apiVersion 0.1.0
 * @apiName GetAllType
 * @apiGroup Type
 * @apiPermission none
 * @apiDescription This function read all the types.
 *
 *
 * @apiSuccess {String}   type.name          Option Name.
 * @apiSuccess {String}   type.description   Option Description.
 *
 * @apiError TypeNotFound   The <code>id</code> of the Type was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 */

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


/**
 * @api {get} /type/:id Read data of a type
 * @apiVersion 0.1.0
 * @apiName GetType
 * @apiGroup Type
 * @apiPermission none
 * @apiDescription This function read a specific type with is id.
 *
 * @apiParam {String} id Name of the Type.
 *
 * @apiSuccess {String}   type.name          Option Name.
 * @apiSuccess {String}   type.description   Option Description.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "graffiti",
 *       "description": "dégradation de mur"
 *     }
 *
 * @apiError TypeNotFound   The <code>id</code> of the Type was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Type not found"
 *     }
 */

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


/**
 * @api {put} /type/:id Change a Type
 * @apiVersion 0.1.0
 * @apiName PutType
 * @apiGroup Type
 * @apiPermission admin
 *
 * @apiDescription This function change a type 
 *
 * @apiParam {Number} id The Type-ID.
 *
 * @apiSuccess {String}   type.name          Option Name.
 * @apiSuccess {String}   type.description   Option Description.
 *
 *
 * @apiError NoAccessRight Only authenticated Admins can change the data.
 * @apiError TypeNotFound   The <code>id</code> of the Type was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 404 NoAccessRight
 *     {
 *       "error": "Type can not change. You haven't the right"
 *     }
 */

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


/**
 * @api {delete} /type/:id Delete data of a type
 * @apiVersion 0.1.0
 * @apiName DeleteType
 * @apiGroup Type
 * @apiPermission admin
 * 
 * @apiDescription This function is for delete a type 
 * 
 * @apiParam {Number} id        The Type-ID.
 *
 * @apiError NoAccessRight Only authenticated Admins can delete the data.
 * @apiError TypeNotFound   The <code>id</code> of the Type was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 404 NoAccessRight
 *     {
 *       "error": "Type can not delete. You haven't the right"
 *     }
 */

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