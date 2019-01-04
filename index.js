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
  //Need a schema to use Joi...like a tester
  const schema = {
    restaurant: Joi.string().min(8).required(),
  };

  const result = Joi.validate(req.body,schema);
  console.log(result);
  const recieve = {
    id: restaurants.length +1,
    restaurant: req.body.restaurant
  };
  restaurants.push(recieve);
  res.send(restaurants)
});


const port= process.env.PORT || 3000
app.listen(port,() => console.log(`Webapp started ${port}`));
//backticks are used for template strings
