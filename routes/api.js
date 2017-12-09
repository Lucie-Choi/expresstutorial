const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get a list of ninjas from the db
router.get("/ninjas", function(req,res, next){
	//find all ninjas: Ninja.find({}) 
	// Ninja.find({}).then(function(ninjas){
	// 	res.send(ninjas)
	// })

	// URL Parameters
	// res.send(req.query)
	

	Ninja.geoNear({
		type: 'Point', coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]
	},
	{
		maxDistance: 100000, spherical: true
	}).then(function(ninjas){
		res.send(ninjas)
	})

	
});


// add a new ninja to the db
router.post("/ninjas", function(req,res, next){
	// mongoose method: create a Ninja instance and save it to db
	Ninja.create(req.body).then(function(ninja) {
		res.send(ninja); // response
	}).catch(next);
	// var ninja = new Ninja(req.body);
	// // save to the database
	// ninja.save();

	
});


// update a ninja in the db
router.put("/ninjas/:id", function(req,res, next){
	Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
		// find the updated ninja
		Ninja.findOne({_id: req.params.id}).then(function(ninja){
			res.send(ninja);
		})
		
	})
	
});


// delete a ninja from the db
router.delete("/ninjas/:id", function(req,res, next){
	// id = req.params.id
	Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
		res.send(ninja);
		});
	});

module.exports = router;