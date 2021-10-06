const mongoose = require('mongoose');

const { ObjectId } = mongoose.SchemaTypes;

const Schema = new mongoose.Schema({
  name: String,
  users: [{
    user: { type: ObjectId, ref: 'users' },
    role: { type: String, default: 'ADMIN' }, // always Uppercase!
  }],
}, {
  timestamps: true, // creates createdAt and updatedAt
});


const Model = mongoose.model('projects', Schema);
module.exports = Model;
