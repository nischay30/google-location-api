const schema = require('../schema.model.js');

module.exports = (req, res) => {
  schema.findOne({email: req.claims.email}, (err, response) => {
    let searches = response.searches;
    searches.unshift(req.body.location);
    schema.updateOne({email: req.claims.email}, { searches: searches}, (err1, response1) => {
      res.json({msg: 'Saved Successfully'});
    });
  });
}