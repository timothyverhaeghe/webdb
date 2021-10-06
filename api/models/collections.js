const mongoose = require('mongoose');

const { ObjectId } = mongoose.SchemaTypes;

const Schema = new mongoose.Schema({
  name: String,
  desc: String,
  headers: [{
    name: String,
    id: String, // how we save it.
    dataType: String,
  }],
  project: { type: ObjectId, ref: 'projects' },
}, {
  minimize: false,
  timestamps: true, // creates createdAt and updatedAt
});


const Model = mongoose.model('datasets', Schema);
module.exports = Model;
