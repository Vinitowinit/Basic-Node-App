const Joi = require('joi');
const config = require('config');
const express = require('express');
const logger = require('./logger');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express ();

app.use(express.json()); //middleware - needed to parse json values when received
app.use(logger);
app.use(express.urlencoded({extended:true})); //takes key-value pair data and returns it as a json format
app.use(express.static('static')); //all static information will be stored in the Static folder
//Static is accessable from the root of index.js
app.use(helmet());
app.use(morgan('tiny'));

//Configuration
console.log('Application Type: ' + config.get("restaurant"));
console.log('Type of Server ' + config.get("type.host"));


require('dotenv').config()

const restaurants = [
  {id:1 , restaurant: 'Il Forno'},
  {id:2 , restaurant: 'Tandoor'},
  {id:3 , restaurant: 'Heavenly Buffalos'},
  {id:4 , restaurant: 'Divinity Cafe'},
];

app.get('/', function (req, res) {
  res.send('Hello express !');
});

app.get('/api/restaurant', (req, res) => {
  res.send(restaurants);
});

app.get('/api/restaurant/:id', (req, res) => {
  const restaur = restaurants.find(rest => rest.id === parseInt(req.params.id));
  if (!restaur) {
     res.status(404).send("Not identifiable in the present");
     return;
   };
  res.send(restaur);
});


app.post('/api/restaurant', (req, res) => {
  const result = handleValidation(req.body).error
  if (result) {
    res.status(400).send(result.details[0].message);
    return;
  };

  const recieve = {
    id: restaurants.length +1,
    restaurant: req.body.restaurant
  };
  restaurants.push(recieve);
  res.send(restaurants);
});


app.put('/api/restaurant/:id', (req,res) => {
  //See if course exists
  const restaur = restaurants.find(rest => rest.id === parseInt(req.params.id));
  //Course not exist return 404
  if (!restaur) {
    res.status(404).send("Not identifiable in the present");
    return;
  };
  //validate
  const result = handleValidation(req.body).error
  if (result) {
    res.status(400).send(result.details[0].message);
    return;
  };
  //Update Restaurant values
  restaur.restaurant = req.body.restaurant;
  //Return Update Course
  res.send(restaur);
  // Return restaurant value
});

app.delete('/api/restaurant/:id', (req,res) => {
  //Look up the course exists or not
  const restaur = restaurants.find(rest => rest.id === parseInt(req.params.id));
  //Course not exist return 404
  if (!restaur) {
    res.status(404).send("Not identifiable in the present");
    return;
  };
  //delete
  const index = restaurants.indexOf(restaur);
  restaurants.splice(index,1);

  //return restaurant value
  res.send(restaur);
});



function handleValidation (restaurant) {
  //Need a schema to use Joi...like a tester
  const schema = {
    restaurant: Joi.string().min(4).required(),
  };
  // Input Validation of String 8 or more letters long
  const result = Joi.validate(restaurant,schema);
  return result;
  };


const port= process.env.PORT || 3000
app.listen(port,() => console.log(`Webapp started ${port}`));
//backticks are used for template strings
