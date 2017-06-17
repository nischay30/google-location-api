const mongoose = require('mongoose');
const config = require('./config');
const mongoURL = config.mongoURL;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURL, (err, res) => {
  if(err) { console.log('Error in Connection of Mongo'); return; }
  console.log('Connected To Mongo');
});
