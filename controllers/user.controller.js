var User = require('../models/User');

module.exports.getUserById = async function (req, res) {

  var users = await User.find();
  res.render('users/index', {
    users: users
  });

};