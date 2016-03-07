var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Comment = mongoose.model('Comment'),
  Staff = mongoose.model('Staff');

module.exports = function (app) {
  app.use('/api/comments', router);
};

/**
/**
 * Function to verify that staffIdentity is provided and valid
 */
function checkStaffExists(req, res, next){
  Staff.findById(req.body.staffIdentity, function(err, existingStaff){
    if (err){
      res.status(500).send(err);
    return;
    } else if (!existingStaff){
        res.status(403).send('You are not authorised to be here');
      return;
    }
    req.staff = existingStaff;

    next();
  });
}
/*

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
 * Funtion to insert Staff.name if Comment.authorname not provided and staffIdentity is provided in the request body
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
 * @api {post} /api/comments Create a new Comment
 * @apiVersion 0.1.0
 * @apiName PostComment
 * @apiGroup Comment
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} name Name of the Comment.
 *
 * @apiSuccess {Number} id         The new Comment-ID.
 *
 * @apiComment CreateCommentError
 */
// POST /api/comments
router.post('/', validateAtleastEmailOrTelephone, insertStaffNameIfAuthornameNotProvided, function (req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function (err, createdComment){
    if (err){
      res.status(500).send(err);
      return;
    }
    res.send(createdComment);
  });
});

/**
 * @api {get} /comment/:id Read data of a Comment
 * @apiVersion 0.1.0
 * @apiName GetComment
 * @apiGroup Comment
 * @apiPermission admin
 * *
 * @apiParam {Number} id The Comment-ID.
 *
 * @apiExample Example usage:
 * curl -i http://localhost:3002/api/Comments
 *
 * @apiSuccess {Number}   id            The Comments-ID.
 * @apiSuccess {Date}     registered    Registration Date.
 * @apiSuccess {Date}     authorname    Fullname of the User.
 * @apiSuccess {Object}   profile       Profile data (example for an Object)
 * @apiSuccess {Number}   profile.age   Users age.
 * @apiSuccess {String}   profile.image Avatar-Image.
 * @apiSuccess {Object[]} options       List of Users options (Array of Objects).
 * @apiSuccess {String}   options.name  Option Name.
 * @apiSuccess {String}   options.value Option Value.
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError CommentNotFound   The <code>id</code> of the User was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 */
// GET /api/comments
router.get('/', function(req, res, next) {

  // Create search criteria.. 
      var criteria = {};
      // Search criteria by authorname..
      if(typeof(req.query.authorname) == "object" && req.query.authorname.length) {
          criteria.authorname= {$in:req.query.authorname};
      } else if (req.query.authorname){
          criteria.authorname=req.query.authorname;
      }

      // Pagination of Comments..
      var page = req.query.page ? parseInt(req.query.page, 10) : 1,
        pagesize = req.query.pagesize ? parseInt(req.query.pagesize, 10) : 30;

      var offset = (page-1)*pagesize, 
        limit = pagesize;

      // Count number of Comments..
      Comment.count(function(err,totalCount){
        if (err){
            res.status(500).send(err);
            return;
        }
        // Count number of Comments filtered by search criteria.. 
        Comment.count(criteria, function(err, filteredCount){
          if (err){
            res.status(500).send(err);
            return;
          }
          // Set pagination info in header..
          res.set('X-Pagination-Page', page);
          res.set('X-Pagination-Page-Size', pagesize);
          res.set('X-Pagination-Total', totalCount);
          res.set('X-Pagination-Filtered-Total', filteredCount);
          // Send query..
            Comment.find(criteria)
              .sort('authorname')
              .skip(offset)
              .limit(limit)
              .exec(function(err, comments){
                if (err) {
                  res.status(500).send(err);
                  return;
                }
                res.send(comments);
              });
          });
      });
});

// GET /api/comments/:id
router.get('/:id', function(req, res, next) {
  var commentId = req.params.id;
  Comment.findById(commentId, function(err, comment){
    if (err) {
      res.status(500).send(err);
      return;
    } else if (!comment) {
      res.status(404).send('Comment not found');
      return;
    }
    res.send(comment);
  });
});

/**
 * @api {put} /comments/:id Change the comment
 * @apiVersion 0.1.0
 * @apiName PutComment
 * @apiGroup Comment
 * @apiPermission none
 *
 * @apiDescription This function has same errors like POST /user, but errors not defined again, they were included with "apiErrorStructure"
 *
 * @apiParam {String} name Name of the Comment
 *
 * @apiComment CreateCommentError
 */

// PUT /api/comments/:id
router.put('/:id',checkStaffExists, validateAtleastEmailOrTelephone, function(req, res, next) {
  var commentId = req.params.id;
  Comment.findById(commentId, function(err, comment){
    if(err) {
      res.status(500).send(err);
      return;
    } else if (!comment) {
      res.status(404).send('Comment not found');
      return;
    }
    comment.authorname = req.body.authorname;
    comment.text = req.body.text;
    comment.date = req.body.date;
    comment.email = req.body.email;
    comment.telephone = req.body.telephone;

    comment.save(function(err, updatedComment) {
      if(err) {
        res.status(500).send(err);
        return;
      }
    res.send(updatedComment);
    });
  });
});

/**
 * @api {put} /Test/:id Change the comment
 * @apiVersion 0.1.0
 * @apiName PutTest
 * @apiGroup Test
 * @apiPermission none
 *
 * @apiDescription Test"
 *
 * @apiParam {String} name Name of the Comment
 *
 * @apiComment CreateCommentError
 */
 // DELETE /api/comments/:id
router.delete('/:id',checkStaffExists, function(req, res, next) {
  var commentId = req.params.id;

// TO DO : CI : only staff that is assigned to Comment can delete it.
// Question : How to send "staffIdentity" in body, with DELETE http verb?
  Comment.remove({
    _id: commentId
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
