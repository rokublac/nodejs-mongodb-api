// jshint esversion:6
const express = require('express');
const router = express.Router();
const Donut = require('../models/donut');

// GET - get a list of donuts from the database
router.get('/donuts', (req,res,next) => {
	// find donuts that are near the input latitdes and longitudes
	Donut.aggregate().near({
		near: {
			type: 'Point',
			coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
		},
		// max range is 100,000 meters, calculated on a spherical basis.
		maxDistance: 100000,
		spherical: true,
		distanceField: 'dis'
	}).then( (donuts) => {
		res.send(donuts);
	});
});

// POST - add a donut to the database
router.post('/donuts', (req,res,next) => {
	// create new instance of a donut
	// mongoose .create method will create an instance aswell as save it to the database.
	Donut.create(req.body).then( (donut) => {
		res.send(donut);
	}).catch((err) => {
		// handle post error - 422 unprocessable entity
		res.status(422).send({ error:err.message });
	});
});

// PUT - update a donut in the database
router.put('/donuts/:id', (req,res,next) => {
	Donut.findByIdAndUpdate({ _id:req.params.id }, req.body).then( () => {
		Donut.findOne({ _id:req.params.id }).then( (donut) => {
			res.send(donut);
		});
	});
});

// DELETE - delete a donut from the database
router.delete('/donuts/:id', (req,res,next) => {
	Donut.findByIdAndRemove({ _id:req.params.id }).then( (donut) => {
		res.send(donut);
	});
});

module.exports = router;

