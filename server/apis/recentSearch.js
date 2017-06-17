const schema = require('../schema.model.js');

module.exports = (req, res) => {
  schema.findOne({email: req.claims.email}, (err, response) => {
    if(err) { console.log('Err:', err); return; }
    res.json({searches: response.searches});
  });
}