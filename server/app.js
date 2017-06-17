const express = require('express');
const app = express();
const path = require('path');
const expressPort = process.env.EXPRESS_PORT || 8090;
const routes = require(path.join(__dirname, 'apis', 'router'));

//Server the static HTML page
app.use(express.static(path.join(__dirname, '..', 'build')));

//Allow cross origin requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-type, Accept");
  next();
});

//Use the required Routes
app.use(routes);

//db connection
require(path.join(__dirname, '.', 'db'));

//Server Started on particular port
app.listen(expressPort, (err) => {
  if(err) { console.log(err); return; }
  console.log('Server started on', expressPort);
});