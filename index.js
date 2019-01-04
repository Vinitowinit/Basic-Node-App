const Joi = require('joi');
const express = require('express');
const app = express ();

app.use(express.json()); //do research - needed to parse json values when received

require('dotenv').config()

const restaurants = [
  {id:1 , restaurant: 'Il Forno'},
  {id:2 , restaurant: 'Tandoor'},
  {id:3 , restaurant: 'Heavenly Buffalos'},
  {id:4 , restaurant: 'Divinity Cafe'},
];

app.get('/', function (req, res) {
  res.send('Hello express !')
});

app.get('/api/restaurant', (req, res) => {
  res.send(restaurants)
});

app.get('/api/restaurant/:id', (req, res) => {
  const restaur = restaurants.find(rest => rest.id === parseInt(req.params.id));
  if (!restaur) res.status(400).send("Not identifiable in the present")
  else res.send(restaur);
});


app.post('/api/restaurant', (req, res) => {
  const result = handleValidation(req.body).error
  if (result) {
    res.status(404).send(result.details[0].message);
    return;
  };

  const recieve = {
    id: restaurants.length +1,
    restaurant: req.body.restaurant
  };
  restaurants.push(recieve);
  res.send(restaurants)
});


app.put('/api/restaurant/:id', (req,res) => {
  //See if course exists
  const restaur = restaurants.find(rest => rest.id === parseInt(req.params.id));
  //Course not exist return 404
  if (!restaur) {
    res.status(400).send("Not identifiable in the present");
    return;
  };
  //validate
  const result = handleValidation(req.body).error
  if (result) {
    res.status(404).send(result.details[0].message);
    return;
  };
  //Update Restaurant values
  restaur.restaurant = req.body.restaurant;
  //Return Update Course
  res.send(restaur);
  // Return restaurant value
  console.log(restaurants);

});

function handleValidation (restaurant) {
  //Need a schema to use Joi...like a tester
  const schema = {
    restaurant: Joi.string().min(8).required(),
  };
  // Input Validation of String 8 or more letters long
  const result = Joi.validate(restaurant,schema);
  return result;
  };


const port= process.env.PORT || 3000
app.listen(port,() => console.log(`Webapp started ${port}`));
//backticks are used for template strings
