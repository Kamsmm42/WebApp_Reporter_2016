var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Comment = mongoose.model('Comment');
  Staff = mongoose.model('Staff');


module.exports = function (app) {
  app.use('/api/comments', router);
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
        res.status(403).send('You are not authorised to be here');
      return;
    }
    req.staff = existingStaff;

    next();
  });
}

/**
 * Funtion to check email and/or telephone field is complete
 */
function validateAtleastEmailOrTelephone(req, res, next){
 var email = req.body.email;
 var telephone = req.body.telephone;
 if(email || telephone){
  console.log( email + " " + telephone);
 } else {
    res.status(400).send('An email or a telephone number is required');
  return;
 }
  next();
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
router.post('/',checkStaffExists, validateAtleastEmailOrTelephone, function (req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function (err, createdComment){
    if (err){
      res.status(500).send(err);
      return;
    }
    // demande Simon: comment sauvegarder l'id du Issue
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
  Comment.find(function(err, comments){
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(comments);
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