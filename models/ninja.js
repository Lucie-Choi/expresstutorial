const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create geolocation Schema
const GeoSchema = new Schema({
	type: {
		type: String,
		default: "Point"
	},
	coordinates: {
		type: [Number], // array of numbers [1, 2, 3...]
		index: "2dsphere"
	}
})

// create ninja Schema & model
const NinjaSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name field is required']
	},
	rank: {
		type: String
	},
	available: {
		type: Boolean,
		default: false
	},
	// add in geo location
	geometry: GeoSchema
});

const Ninja = mongoose.model('ninja', NinjaSchema);

// exporting so that I can use this. 
module.exports = Ninja;