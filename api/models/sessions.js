const mongoose = require('mongoose');

const { ObjectId } = mongoose.SchemaTypes;

const Schema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'users' },
  token: String,
  ua: String,
  ip: String,
  active: { type: Boolean, default: false },
  activated: Date,
}, {
  timestamps: true, // creates createdAt and updatedAt
});


const Model = mongoose.model('sessions', Schema);
module.exports = Model;
