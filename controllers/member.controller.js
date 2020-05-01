var Member = require('../models/Member');

module.exports.getMemById = async function (req, res) {

  var mems = await Member.find();
  res.render('members/index', {
    members: mems
  });

};