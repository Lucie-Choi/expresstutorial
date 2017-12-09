const express = require('express');
// set up express app
const app = express();

const mongoose = require ('mongoose');

// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago'); // create a databse called ninjago if there isn't
mongoose.Promise = global.Promise;

// bodyParser is our middleware
const bodyParser = require('body-parser');

// look in the public folder
app.use(express.static('./public'));

// app.use(middleware)
app.use(bodyParser.json());

// initialize routes
const routes = require('./routes/api')
app.use('/api', routes);


// Error handling middleware
app.use(function(err, req, res, next){
	// console.log(err);
	res.status(422).send({error: err.message});
})


// // listening to get requests. (typing /api)
// app.get('/api', function(req, res){
// 	console.log('GET request');
// 	res.send({name:'Yoshi'})
// 	// res.end()
// })


//listen for requests
app.listen(process.env.port || 4000, function(){
	console.log('now listening for requests');
});
