var router = require('express').Router();
var Project = require("../../models/Project");

// create new project
router.post('/project', function (req, res, next) {
  Project.findById(req.payload.id).then(function (project) {
    if (!project) {
      return res.sendStatus(401);
    }

    var project = new Project();
    
    return project.save().then(function () {
      console.log('---create new success', project);
      return res.json({ project })
    })
  });
});

// create new user 
router.post('/users', function (req, res, next) {
  var user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  // user.setPassword(req.body.user.password);

  user.save().then(function () {
    return res.json({ user });
  }).catch(next);
});

module.exports = router;