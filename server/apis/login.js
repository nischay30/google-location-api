const schema = require('../schema.model.js');
const config = require('../config');
const jsonwebtoken = require('jsonwebtoken');

module.exports = (req, res) => {
  loginUser(req.body, res);
}

function loginUser(value, res) {
  schema.findOne({email: value.email}, (err, response) => {
    if(err) { console.log('Error:', err); return; }
    else {
      if(!response) {
        res.json({msg: 'User doesn\'t exist'});
      } else {
        response.password === value.password ? createJsonToken(response.name, response.email, res) : 
        res.json({msg: 'Incorrect Userid/password'});
      }
    }
  });
}

function createJsonToken(name, email, res) {
  jsonwebtoken.sign({
    email: email,
    name: name
  }, config.jwtSecret,
  function(err3, jwt) {
    if(err3) { console.log('Error', err3); res.status(500).json(err3); return; }
      res.json({msg: 'login Successful', token: jwt});
    return;
  });
}