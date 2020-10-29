const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");


//Get all restaurants
router.get("/", (req, res) => {
	Restaurant.find()
		.then(restaurants => res.json(restaurants))
		.catch(err => res.status(400).json("Error: " + err));
});



// Search for restaurants with name containing searched words
router.post("/search", (req, res) => {
	const searchName = req.body.name;
	let regexName = new RegExp(escapeRegExp(searchName), 'gi');
	Restaurant.find({name: regexName})
		.then(restaurants => res.json(restaurants))
		.catch(err => res.json("No Restaurant match the query, please search again!"));				
});



// Get restaurant with specific id
router.get("/:id", (req, res) => {
	Restaurant.findById(req.params.id).populate("comments")
		.then(restaurant => res.json(restaurant))
		.catch(err => res.status(400).json("Error: " + err));
});



// Create new restaurant
router.post("/", (req, res) => {
	const name = req.body.name;
	const image = req.body.image;
	const flavor = req.body.flavor;
	const address = req.body.address;
	const description = req.body.description;
	
	const restaurant = new Restaurant({
		name,
		image,
		flavor,
		address,
		description
	});
	
	restaurant.author = {
		id: req.body.author_id,
		username: req.body.author_name
	};	
	
	restaurant.save()
		.then(() => res.json("Restaurant added!"))
		.catch(err => res.status(400).json("Error: " + err));
});



// Update restaurant with specific id
router.post("/:id/update", (req, res) => {
	Restaurant.findById(req.params.id)
		.then(restaurant => {
			restaurant.name = req.body.name;
			restaurant.image = req.body.image;
			restaurant.flavor = req.body.flavor;
			restaurant.address = req.body.address;
			restaurant.description = req.body.description;
		
			restaurant.save()
				.then(() => res.json("Restaurant updated!"))
				.catch(err => res.status(400).json("Error: " + err));
		})
		.catch(err => res.status(400).json("Error: " + err));	
});



// Delete restaurant with specific id
router.delete("/:id", (req, res) => {
	Restaurant.findByIdAndRemove(req.params.id)
		.then(() => res.json("Restaurant deleted!"))
		.catch(err => res.status(400).json("Error: " + error));
});



escapeRegExp = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}


module.exports = router;