const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");



router.post("/register", function(req, res){
	let user = new User({username: req.body.username});
	
	if (req.body.adminCode == "ThisIsSecreteAdminCode"){
		user.isAdmin = true;
	}

	User.register(user, req.body.password, function(err, user){
		if (err){
			res.json(err);
		}
		else{
			passport.authenticate("local")(req, res, function(){
				res.json("RegisterSuccess")
			});
		}
	});
});



router.post("/login", passport.authenticate("local"), (req, res) => {
	res.json({user: req.user, authenticated: true})
});




router.get("/logout", function(req, res){
	req.logout();
});



module.exports = router;