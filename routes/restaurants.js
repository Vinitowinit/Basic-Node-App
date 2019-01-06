const express = require('express');
const route = express.Router();

const restaurants = [
  {id:1 , restaurant: 'Il Forno'},
  {id:2 , restaurant: 'Tandoor'},
  {id:3 , restaurant: 'Heavenly Buffalos'},
  {id:4 , restaurant: 'Divinity Cafe'},
];

route.get('/api/restaurant', (req, res) => {
  res.send(restaurants);
});

route.get('/api/restaurant/:id', (req, res) => {
  const restaur = restaurants.find(rest => rest.id === parseInt(req.params.id));
  if (!restaur) {
     res.status(404).send("Not identifiable in the present");
     return;
   };
  res.send(restaur);
});


route.post('/api/restaurant', (req, res) => {
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


route.put('/api/restaurant/:id', (req,res) => {
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

route.delete('/api/restaurant/:id', (req,res) => {
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


module.exports = route;
