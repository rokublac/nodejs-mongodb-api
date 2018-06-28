// jshint esversion:6
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create geo location schema (GeoJSON)
const GeoSchema = new Schema({
	type: {
		type: String,
		default: "Point"

	},
	coordinates: {
		type: [Number],
		index: "2dsphere"
	}
});

// create donut schema and model
const DonutSchema = new Schema({
	name: {
		type: String,
		required: [true, "Name field is required"]
	},
	flavour: {
		type: String,
	},
	delicious: {
		type: Boolean,
		default: true
	},
	geometry: GeoSchema

});

const Donut = mongoose.model('donut', DonutSchema);

module.exports = Donut;