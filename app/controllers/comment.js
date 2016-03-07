var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Comment = mongoose.model('Comment'),
  Staff = mongoose.model('Staff');

module.exports = function (app) {
  app.use('/api/comments', router);
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
        res.status(403).send('You are not authorised to be here');
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
 * @apiDescription Create a new comment only if you're a staff member or you enter a email / telephone.
 *
 * @apiSuccess {Number} id         The new Comment-ID.
 * @apiSuccess {String}     comment.authorname          comment authorname.
 * @apiSuccess {String}     comment.text                comment Description.
 * @apiSuccess {Date}       comment.date                comment image.
 * @apiSuccess {String}     comment.email               comment email.
 * @apiSuccess {Number}     comment.telephone           comment telephone.
 * @apiSuccess {String}     comment.issueId             comment issueId.
 *
 * @apiComment CreateCommentError
 */

// POST /api/comment
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
 * @api {get} /comments/:id Read data of a all Comments
 * @apiVersion 0.1.0
 * @apiName GetAllComment
 * @apiGroup Comment
 * @apiPermission none
 *
 * @apiDescription This function read a specific all Comments .
 *
 * @apiSuccess {String}     comment.authorname          comment authorname.
 * @apiSuccess {String}     comment.text                comment Description.
 * @apiSuccess {Img}        comment.date                comment image.
 * @apiSuccess {String}     comment.email               comment email.
 * @apiSuccess {Number}     comment.telephone           comment telephone.
 * @apiSuccess {String}     comment.issueId             comment issueId.
 *
 * @apiError CommentNotFound   The <code>id</code> of the Comment was not found.
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
/**
 * @api {get} /comments/:id Read data of a Comment
 * @apiVersion 0.1.0
 * @apiName GetComment
 * @apiGroup Comment
 * @apiPermission none
 *
 * @apiDescription This function read a specific Comment with his id.
 *
 * @apiSuccess {String}     comment.authorname          comment authorname.
 * @apiSuccess {String}     comment.text                comment Description.
 * @apiSuccess {Img}        comment.date                comment image.
 * @apiSuccess {String}     comment.email               comment email.
 * @apiSuccess {Number}     comment.telephone           comment telephone.
 * @apiSuccess {String}     comment.issueId             comment issueId.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "authorname":        "Kevin",
 *       "text":              "C'est pas cool",
 *       "date":              "12.10.2014",
 *       "email":             "cestdurelavie@hotmail.com",
 *       "telephone":         "000333222",
 *       "issueId":           "gdvergdb"
 *     }
 *
 * @apiError CommentNotFound   The <code>id</code> of the Comment was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "comment not found"
 *     }
 */
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
 * @api {put} /comments/:id Change a comment
 * @apiVersion 0.1.0
 * @apiName PutComment
 * @apiGroup Comment
 * @apiPermission admin
 *
 * @apiDescription This function change a comment 
 *
 * @apiParam {Number} id The Comment-ID.

 * @apiSuccess {String}   comment.authorname          comment authorname.
 * @apiSuccess {String}   comment.text                comment Description.
 * @apiSuccess {Date}      comment.date                comment image.
 * @apiSuccess {String}   comment.email               comment email.
 * @apiSuccess {Number}   comment.telephone           comment telephone.
 * @apiSuccess {String}   comment.issueId             comment issueId.
 *
 *
 * @apiError NoAccessRight Only authenticated Admins can change the data.
 * @apiError CommentNotFound   The <code>id</code> of the comment was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 404 NoAccessRight
 *     {
 *       "error": "Comment can not change. You haven't the right"
 *     }
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
 * @api {delete} /comments/:id Delete data of a comment
 * @apiVersion 0.1.0
 * @apiName DeleteComment
 * @apiGroup Comment
 * @apiPermission admin  
 * 
 * @apiDescription This function for delete a comment 
 * 
 * @apiParam {Number} id        The Comment-ID.
 *
 * @apiError NoAccessRight Only authenticated Admins can delete the data.
 * @apiError CommentNotFound   The <code>id</code> of the Comment was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 404 NoAccessRight
 *     {
 *       "error": "Comment can not delete. You haven't the right"
 *     }
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
