var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  project_id: { type: String, lowercase: true, unique: true, match: [/^a-zA-Z0-9+$/, '111'], },
  name: { type: String, lowercase: false, unique: true, match: [/^A-Z0-9+$/, '222'] },
  description: String,
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema); 
