const path = require('path');
const config = require(path.join(__dirname, '..', 'config'));
const request = require('superagent');

module.exports = (req, response1) => {
  const locationToSearch = req.params.location;
  const apiKey = config.apiKey;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
  request
    .get(url)
    .query({key: apiKey})
    .query({input: locationToSearch})
    .end((err, response2) => {
      if(err) { console.log('Error', err); return; }
      const prediction = response2.body.predictions.map((suggestion, index) => {
        return( suggestion.description);
      });
      response1.json(prediction);
    });
}
