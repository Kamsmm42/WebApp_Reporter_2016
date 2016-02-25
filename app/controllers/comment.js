var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Comment = mongoose.model('Comment');

module.exports = function (app) {
  app.use('/api/comments', router);
};

// POST /api/comments
router.post('/', function (req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function (err, createdComment){
    if (err){
      res.status(500).send(err);
      return;
    }
    res.send(createdComment);
  });
});

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

// PUT /api/comments/:id
router.put('/:id', function(req, res, next) {
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

// DELETE /api/comments/:id
router.delete('/:id', function(req, res, next) {
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