var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  id: { type: String, lowercase: true, unique: true, match: [/^a-zA-Z0-9+$/, '111'], },
  name: { type: String, lowercase: false, unique: true, match: [/^A-Z0-9+$/, '222'] },
  description: String,
}, { timestamps: true });

ProjectSchema.methods.createNewPrj = function () {

}

ProjectSchema.methods.updatePrj = function (id) {
  if (this.id.indexOf(id) === -1) {
    // notify this prj not exist
  }
  return this.save();
}


mongoose.model('Project', ProjectSchema); 