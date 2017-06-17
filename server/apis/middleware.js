const jsonwebtoken = require('jsonwebtoken');
const config = require('../config');
module.exports = (req, res, next) => {
  const token = req.body.token;

  if(!token) {res.status(500).send(); return; }
  try {
    const decoded = jsonwebtoken.verify(token, config.jwtSecret);
    req.claims = decoded;
    next();
  } catch(err) {
    next(err);
  }
}