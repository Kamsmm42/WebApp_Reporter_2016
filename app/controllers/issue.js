var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Issue = mongoose.model('Issue');
  Staff = mongoose.model('Staff');


module.exports = function (app) {
  app.use('/api/issues', router);
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

// POST /api/issues
router.post('/',checkStaffExists, validateAtleastEmailOrTelephone, function (req, res, next) {
  var issue = new Issue(req.body);
  issue.save(function (err, createdIssue){
    if (err){
      res.status(500).send(err);
      return;
    }
    res.send(createdIssue);
  });
});

// GET /api/issues
router.get('/', function(req, res, next) {

  
  // création d'un critère de recherche 
      var criteria = {};
      //critère recherche par Tags
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

  // Pagination de Issues

      var page = req.query.page ? parseInt(req.query.page, 10) : 1,
        pagesize = req.query.pagesize ? parseInt(req.query.pagesize, 10) : 30;

      var offset = (page-1)*pagesize, 
        limit = pagesize;

      // compte du nombre de Issues
      Issue.count(function(err,totalCount){
        if (err){
            console.log('erreur total count');
            res.status(500).send(err);

            return;
        }
        // compte la quantité selon critère 
        Issue.count(criteria, function(err, filteredCount){
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
            Issue.find(criteria)
              .sort('authorname')
              .skip(offset)
              .limit(limit)
              .exec(function(err, issues){
                if (err) {
                  res.status(500).send(err);
                  return;
                }

                console.log(req.query.authorname);
                res.send(issues);
              });
          });
      });
  
  
});

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