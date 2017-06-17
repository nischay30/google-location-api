const schema = require('../schema.model.js');
module.exports = (req, res) => {
  signupUser(req.body, res);
}

function signupUser(value, res) {
  const user = new schema(value);
  user.save((err, response) => {
    if(err) { 
      if(err.code === 11000) {
        res.json({msg: 'User already Exists'});
      } else {
        console.log('Error:', err); return; }
    }
    else {
      res.json({msg: 'Successfully Saved'});    
    }
  });
}