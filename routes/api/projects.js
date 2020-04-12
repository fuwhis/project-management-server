var router = require('express').Router();
var Project = require("../../models/Project");

// create new project
router.post('/projects/create-new', function (req, res, next) {
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

// update project
router.put('/projects/update/:id', (req, res) => {
  // Validate request
  if (!req.body.id) {
    return res.status(400).send({
      message: 'Project Id can not be null'
    });
  }

  // Find project and update
  Project.findByIdAndUpdate(req.params.id, {
    name: req.body.name || '',
    description: req.body.description
  }, { new: true }).then(prj => {
    if (!prj) {
      return res.status(404).send({
        message: 'Project not found'
      });
    }
    res.send(prj);
  }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: 'Project not found with id ' + req.params.id
      });
    }
    return res.status(500).send({
      message: "Error updating project with id " + req.params.id
    });
  })
});

// assign member to project

// show project detail (name, list member)
module.exports = router;