var mongoose = require('mongoose');
var router = require('express').Router();
var Member = require("../../models/Member");

// router.param('member', function (req, res, next, mname) {
//   Member.findOne({ member: mname }).then(function (member) {
//     if (!member) {
//       return res.sendStatus(404);
//     }
//     console.log('------member findOne'); 
//     return next();
//   }).catch(next);
// });

router.get('/', function (req, res, next) {
  if (req.payload) {
    Member.findById(req.params.id).then(function () {
      //
    });
  } else {
    return res.json({ member: req.member.toMemberJSON(false) })
  }
});

// create new member
router.post('/create-member', function (req, res, next) {
  Member.findById(req.payload.id).then(function (member) {
    if (!member) {
      return res.sendStatus(401);
    }

    var member = new Member();

    member.member_name = req.body.member.member_name;
    member.phone = req.body.member.phone;
    member.birthdate = req.body.member.birthdate;

    return member.save().then(function () {
      return res.json({ member })
    })
  });
});

module.exports = router;