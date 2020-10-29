const express = require("express");
const router = express.Router({mergeParams: true});
const Restaurant = require("../models/restaurant");
const Comment = require("../models/comment");


// Get comment with specific id
router.get("/:comment_id", (req, res) => {
	Comment.findById(req.params.comment_id)
		.then(comment => res.json(comment))
		.catch(err => res.status(400).json("Error: " + err));
});



// Create new comment for restaurant of specific id
router.post("/", (req, res) => {
	Restaurant.findById(req.params.id)
		.then(restaurant => {		
			const text = req.body.text;
			const comment = new Comment({
				text
			});
		
			comment.author = {
				id: req.body.author_id,
				username: req.body.author_name
			}
			
			comment.save()
				.then(() => res.json("Comment saved!"))
				.catch(err => res.status(400).json("Error: " + err));
		
			restaurant.comments.push(comment);
			restaurant.save()
				
		})
		.catch(err => res.status(400).json("Error: " + err));
});



// Update comment with specific id
router.post("/:comment_id/update", (req, res) => {
	Comment.findById(req.params.comment_id)
		.then(comment => {
			comment.text = req.body.text;
			
			comment.save()
				.then(() => res.json("Comment addded!"))
				.catch(err => res.status(400).json("Error: " + err));
		})
		.catch(err => res.status(400).json("Error: " + err));
});




// Delete comment with specific id
router.delete("/:comment_id", (req, res) => {
	Restaurant.findById(req.params.id)
		.then(restaurant => {			
			restaurant.comments.pull(req.params.comment_id);
			restaurant.save()
				
		
			Comment.findByIdAndDelete(req.params.comment_id)
				.then(() => res.json("Comment deleted!"))
				.catch(err => res.status(400).json("Error: " + err));
				
		})
		.catch(err => res.status(400).json("Error: " + err));
});


module.exports = router;