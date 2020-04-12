var router = require('express').Router();
var Project = require("../../models/Project");

// create new project
router.post('/project', function (req, res, next) {
  Project.findById(req.payload.id).then(function (project) {
    if (!project) {
      return res.sendStatus(401);
    }

    var project = new Project();

    project.name = req.body.project.name; 
    project.description = req.body.project.description;

    project.save().then(function () {
      return res.json({ project })
    })
  });
});

module.exports = router;