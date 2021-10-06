const mongoose = require('mongoose');

const { ObjectId } = mongoose.SchemaTypes;


const Schema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  avatar: { type: String, default: 'https://cdn.tablefixr.com/profile-pictures/default.png' },
  role: String,
  lastActive: Date,
  project: { type: ObjectId, ref: 'projects' },
}, {
  timestamps: true, // creates createdAt and updatedAt
});


const Model = mongoose.model('users', Schema);
module.exports = Model;
