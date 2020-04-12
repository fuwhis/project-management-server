var mongoose = require('mongoose');
var router = require('express').Router();
var Member = require("../../models/Member");

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

// update member
router.patch('/update-member/:id', function (req, res, next) {
  Member.findByIdAndUpdate(req.payload.id, req.body, { new: true }, function (err, member) {
    if (err) {
      next(err);
    } else {
      // member.member_name = req.body.member.member_name;
      // member.phone = req.body.member.phone;
      // member.birthdate = req.body.member.birthdate;
      res.json({ member });
    }
  })
});

// delete member
router.delete('/delete-member');

// retrieve all member
router.get('/retrieve-all-members', (req, res, next) => {
  Member.find().then(member => {
    res.send(member);
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Error occured while retrieving members.'
    });
  })
});

module.exports = router;