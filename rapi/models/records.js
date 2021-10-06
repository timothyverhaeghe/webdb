const mongoose = require('mongoose');

const { ObjectId } = mongoose.SchemaTypes;

const Schema = new mongoose.Schema({
  dataset: { type: ObjectId, ref: 'datasets' },
  data: { type: Object, default: {} },
}, {
  minimize: false,
  timestamps: true, // creates createdAt and updatedAt
});


const Model = mongoose.model('records', Schema, 'data');
module.exports = Model;
