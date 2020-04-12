var mongoose = require('mongoose')

var MemberSchema = new mongoose.Schema({
  // member_id: {
  //   type: String, lowercase: true, unique: true, match: [/^[a-zA-Z0-9]+$/, '...'], index: true
  // },
  member_name: { type: String, lowercase: true, unique: false, },
  phone: { type: Number, },
  birthdate: { type: Date, },
}, { timestamps: true });

module.exports = mongoose.model('Member', MemberSchema);