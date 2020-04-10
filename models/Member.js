var mongoose = require('mongoose')

var MemberSchema = new mongoose.Schema({
  member_id: {
    type: String, lowercase: true, unique: true, match: [/^[a-zA-Z0-9]+$/, '...'], index: true
  },
  member_name: { type: String, lowercase: true, unique: false, },
  phone: { type: Number, },
  birthdate: { type: Date, },
}, { timestamps: true });

MemberSchema.methods.toMemberJSON = function() {
  return {
    member_name: this.member_name,
    phone: this.phone,
    birthdate: this.birthdate
  }
}

MemberSchema.methods.addMember = function () {
  // xem lai
  return {
    member_id: this.member_id + 1,
    member_name: this.member_name,
    phone: this.phone,
    birthdate: this.birthdate
  }
}

MemberSchema.methods.updateMember = function (member_id) {
  if (this.member_id.indexOf(member_id) === -1) {
    // notify this mem not exist
  }
  return this.save();
}


mongoose.model('Member', MemberSchema);