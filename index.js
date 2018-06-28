// jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// set up express app
const app = express();
const port = process.env.port || 3000;

// connect to mongodb
mongoose.connect('mongodb://localhost/gogodonuts');
//overide mongoose promise because deprecation
mongoose.Promise = global.Promise;

// middleware to serve static files - front end HTML
app.use(express.static('public'));

// middleware to parse json since we are using json in this case
app.use(bodyParser.json());

// initialized routes
app.use('/api', require('./routes/api'));

// listen for requests
app.listen(port, () => {
	console.log(`App running - listening on port ${port}`);
});

// GET request response from homepage of localhost
app.get('/', (req,res) => {
	console.log('GET request');
	// send response
	res.send({
		name: 'Hello',
		lastName: 'Universe!'
	});
});


