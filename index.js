const Joi = require('joi');
const config = require('config');
const express = require('express');
const app = express ();
const helmet = require('helmet');
const morgan = require('morgan');

const logger = require('./logger');
const restaurants = require('./routes/restaurants');
const home = require('./routes/home')

//All middleware
app.use(express.json()); //middleware - needed to parse json values when received
app.use(logger);
app.use(express.urlencoded({extended:true})); //takes key-value pair data and returns it as a json format
app.use(express.static('static')); //all static information will be stored in the Static folder
//Static is accessable from the root of index.js
app.use(helmet());
app.use(morgan('tiny'));

//Route to endpoints when these HTTP requests are asked on
app.use('/api/restaurant', restaurants);
app.use('/',home);

//Configuration
console.log('Application Type: ' + config.get("restaurant"));
console.log('Type of Server ' + config.get("type.host"));


require('dotenv').config()

const port= process.env.PORT || 3000
app.listen(port,() => console.log(`Webapp started ${port}`));
//backticks are used for template strings
