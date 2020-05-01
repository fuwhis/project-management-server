var mongoose = require('mongoose');
var router = require('express').Router();
var Member = require("../../models/Member");

// create new member
router.post('/members/create-member', (req, res) => {
  // Create a member
  const member = new Member({
    member_name: req.body.member.member_name,
    phone: req.body.member.phone,
    birthdate: req.body.member.birthdate,
  });
  // Save Member in the db
  member.save()
    .then(member => {
      res.json(member);
    }).catch(err => {
      res.status(500).send({
        message: err.message || 'Some errors occured while creating a new Member.'
      })
    })
});

// update member
router.put('/members/update/:id', (req, res) => {

  Member.findByIdAndUpdate(req.params.id, {
    member_name: req.body.member_name,
    phone: req.body.phone,
    birthdate: req.body.birthdate
  }, { new: true }).then(member => {
    if (!member) {
      return res.status(404).send({
        message: 'Member not found'
      });
    }
    return res.status(500).send({
      message: 'Error updating member with id ' + req.params.id
    })
  })
});

// delete member
router.delete('/members/delete/:id', (req, res) => {
  Member.findByIdAndRemove(req.params.id)
    .then(member => {
      if (!member) {
        return res.status(404).send({
          message: "Member not found with id: " + req.params.id
        });
      }
      res.send({ message: "Member deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Member not found with id: " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete member with id " + req.params.id
      });
    })
});

// retrieve all member
router.get('/members/get-all-members', (req, res) => {
  Member.find().then(member => {
    res.send(member);
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Error occured while retrieving members.'
    });
  })
});

/**
 * @swagger
 * /api/members/{id}:
 *   get:
 *     tags:
 *       - Members
 *     description: Returns a single member
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Member's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single member
 *         schema:
 *           $ref: '#/definitions/member'
 */
router.get('/members/:id', (req, res) => {
  // console.log('---req.body', req.body)
  // console.log('--req.params', req.params)
  Member.findById(req.params.id)
    .then(member => {
      if (!member) {
        return res.status(404).send({
          message: 'Member not found!'
        });
      }
      res.send(member);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Member not found with id: ' + req.params.id
        });
      }
      return res.status(500).send({
        message: 'Error getting member with id ' + req.params.id
      });
    })
});
module.exports = router;