var Project = require('../models/Project');

module.exports.getProjectById = async function (req, res) {

  var projects = await Project.find();
  res.render('project/index', {
    projects: projects
  });

};