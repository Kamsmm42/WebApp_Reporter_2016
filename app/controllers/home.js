var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};


//documentation apidoc 
router.get('/', function (req, res, next) {
  res.redirect('/apidoc');
});

