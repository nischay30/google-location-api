const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDetails = new Schema({
  email: { type: 'String', unique: true, required: true },
  password: { type: 'String'},
  name: {type: String},
  searches: { type: Array, default: []}
});

module.exports = mongoose.model('userDetails', userDetails);
