const express = require('express');
const route = express.Router();

//Endpoint for Home page
route.get('/', function (req, res) {
  res.send('Hello express !');
});

module.exports = route;
