var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Issue = mongoose.model('Issue'),
  Staff = mongoose.model('Staff');


module.exports = function (app) {
  app.use('/api/issues', router);
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
 * Function to check email and/or telephone field is complete
 */
function validateAtleastEmailOrTelephone(req, res, next){
 var email = req.body.email;
 var telephone = req.body.telephone;
 if(email || telephone){
  // Valid.. so continue..
 } else {
    res.status(400).send('An email or a telephone number is required');
  return;
 }
  next();
}

/**
 * Function to insert Staff.name if Issue.authorname not provided and staffIdentity is provided in the request body
 */
function insertStaffNameIfAuthornameNotProvided(req, res, next){
 var authorname = req.body.authorname;
 var staffID = req.body.staffIdentity;
 if(staffID && !authorname){
  // find staff and insert staff's name as authorname
  Staff.findById(req.body.staffIdentity, function(err, existingStaff){
    if (err){
      res.status(500).send(err);
    return;
    } else if (!existingStaff){
        res.status(400).send('Staff ID provided is not valid');
      return;
    }
    req.staff = existingStaff;
    req.body.authorname = req.staff.name;
    next();
  });
 } else {
  // authorname provided and/or staffID not provided.. continue..
  next();
 }
}

/**
 * @api {post} /api/issues Create a new Issue
 * @apiVersion 0.1.0
 * @apiName PostIssue
 * @apiGroup Issue
 * @apiPermission none
 *
 * @apiDescription Create a new Issue only if you're a staff member or you enter a email / telephone.
 *
 * @apiSuccess {String}   type.authorname          Issue authorname.
 * @apiSuccess {String}   type.description         Issue Description.
 * @apiSuccess {Img}      type.img_url             Issue image.
 * @apiSuccess {String}   type.tags                Issue tags.
 * @apiSuccess {String}   type.email               Issue email.
 * @apiSuccess {Number}   type.telephone           Issue telephone.
 * @apiSuccess {String}   type.location            Issue location.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "authorname": "Jerome",
 *      "description": "dégradation de mur",
 *      "image": "mur.png",
 *      "tags": "graffiti",
 *      "email": "Jerome@gml.com",
 *      "telephone": "0404848373",
 *      "location": "Yverdon"
 *     }
 *
 * @apiComment CreateIssue
 */

// POST /api/issues
router.post('/', validateAtleastEmailOrTelephone, insertStaffNameIfAuthornameNotProvided, function (req, res, next) {
  console.log("After : " + req.body.authorname);
  var issue = new Issue(req.body);
  issue.save(function (err, createdIssue){
    if (err){
      res.status(500).send(err);
      return;
    }
    res.send(createdIssue);
  });
});

/**
 * @api {get} /issues/:id Read data of all Issues
 * @apiVersion 0.1.0
 * @apiName GetAllIssues
 * @apiGroup Issue
 * @apiPermission none
 *
 * @apiDescription This function read a specific all Staff.
 *
 * @apiSuccess {String}   type.authorname          Issue authorname.
 * @apiSuccess {String}   type.description         Issue Description.
 * @apiSuccess {Img}      type.img_url             Issue image.
 * @apiSuccess {String}   type.tags                Issue tags.
 * @apiSuccess {String}   type.email               Issue email.
 * @apiSuccess {Number}   type.telephone           Issue telephone.
 * @apiSuccess {String}   type.location            Issue location. *
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "authorname": "Jerome",
 *      "description": "dégradation de mur",
 *      "image": "mur.png",
 *      "tags": "graffiti",
 *      "location": "Yverdon"
 *     }
 *
 * @apiError IssueNotFound   The <code>id</code> of the Issue was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Issue not found"
 *     }
 */

// GET /api/issues
router.get('/', function(req, res, next) {

  // Create search criteria.. 
      var criteria = {};
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

  // Pagination of Issues..
      var page = req.query.page ? parseInt(req.query.page, 10) : 1,
        pagesize = req.query.pagesize ? parseInt(req.query.pagesize, 10) : 30;

      var offset = (page-1)*pagesize, 
        limit = pagesize;

      // Count number of Issues..
      Issue.count(function(err,totalCount){
        if (err){
            console.log('erreur total count');
            res.status(500).send(err);
            return;
        }
        // Count number of Issues filtered by search criteria.. 
        Issue.count(criteria, function(err, filteredCount){
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
            Issue.find(criteria)
              .sort('authorname')
              .skip(offset)
              .limit(limit)
              .exec(function(err, issues){
                if (err) {
                  res.status(500).send(err);
                  return;
                }
                res.send(issues);
              });
          });
      });
});

/**
 * @api {get} /issues/:id Read data of an Issue
 * @apiVersion 0.1.0
 * @apiName GetIssue
 * @apiGroup Issue
 * @apiPermission none
 *
 * @apiDescription This function read a specific Issue with his id.
 * 
 * @apiParam {Number} id        The Issue-ID.
 *
 * @apiSuccess {String}   type.authorname          Issue authorname.
 * @apiSuccess {String}   type.description         Issue Description.
 * @apiSuccess {Img}      type.img_url             Issue image.
 * @apiSuccess {String}   type.tags                Issue tags.
 * @apiSuccess {String}   type.email               Issue email.
 * @apiSuccess {Number}   type.telephone           Issue telephone.
 * @apiSuccess {String}   type.location            Issue location.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "authorname": "Jerome",
 *      "description": "dégradation de mur",
 *      "image": "mur.png",
 *      "tags": "graffiti",
 *      "email": "Jerome@gml.com",
 *      "telephone": "0404848373",
 *      "location": "Yverdon"
 *     }
 *
 * @apiError IssueNotFound   The <code>id</code> of the Issue was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Issue not found"
 *     }
 */

// GET /api/issues/:id
router.get('/:id', function(req, res, next) {
  var issueId = req.params.id;
  Issue.findById(issueId, function(err, issue){
    if (err) {
      res.status(500).send(err);
      return;
    } else if (!issue) {
      res.status(404).send('Issue not found');
      return;
    }
    res.send(issue);
  });
});

/**
 * @api {put} /issues/:id Change a Issue
 * @apiVersion 0.1.0
 * @apiName PutIssue
 * @apiGroup Issue
 * @apiPermission admin
 *
 * @apiDescription This function change a issue 
 *
 * @apiParam {Number} id The Issue-ID.
 *
 * @apiSuccess {String}   type.authorname          Issue authorname.
 * @apiSuccess {String}   type.description         Issue Description.
 * @apiSuccess {Img}      type.img_url             Issue image.
 * @apiSuccess {String}   type.tags                Issue tags.
 * @apiSuccess {String}   type.email               Issue email.
 * @apiSuccess {Number}   type.telephone           Issue telephone.
 * @apiSuccess {String}   type.location            Issue location.
 *
 *
 * @apiError NoAccessRight Only authenticated Admins can change the data.
 * @apiError TypeNotFound   The <code>id</code> of the Issue was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 404 NoAccessRight
 *     {
 *       "error": "Issue can not change. You haven't the right"
 *     }
 */

// PUT /api/issues/:id
router.put('/:id',checkStaffExists, validateAtleastEmailOrTelephone, function(req, res, next) {
  var issueId = req.params.id;
  Issue.findById(issueId, function(err, issue){
    if(err) {
      res.status(500).send(err);
      return;
    } else if (!issue) {
      res.status(404).send('Issue not found');
      return;
    }
    issue.authorname = req.body.authorname;
    issue.date = req.body.date;
    issue.url_image = req.body.url_image;
    issue.description = req.body.description;
    issue.telephone = req.body.telephone;
    issue.email = req.body.email;
    issue.coordinates = req.body.coordinates;
    issue.tags = req.body.tags;
    issue.actions = req.body.actions;

    issue.save(function(err, updatedIssue) {
      if(err) {
        res.status(500).send(err);
        return;
      }
    res.send(updatedIssue);
    });
  });
});

/**
 * @api {delete} /issues/:id Delete data of a Issue
 * @apiVersion 0.1.0
 * @apiName DeleteIssue
 * @apiGroup Issue
 * @apiPermission admin  
 * 
 * @apiDescription This function for delete a Issue 
 * 
 * @apiParam {Number} id        The Issue-ID.
 *
 * @apiError NoAccessRight Only authenticated Admins can delete the data.
 * @apiError IssueNotFound   The <code>id</code> of the Issue was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 404 NoAccessRight
 *     {
 *       "error": "This issue can not delete. You haven't the right"
 *     }
 */

// DELETE /api/issues/:id
router.delete('/:id',checkStaffExists, function(req, res, next) {
  var issueId = req.params.id;
  // Issue.findById(issueId, )
  Issue.remove({
    _id: issueId
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