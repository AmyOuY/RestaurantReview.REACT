const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");



mongoose.connect("mongodb://localhost/restaurantReviewReact",
				 {
					useNewUrlParser: true,
					useUnifiedTopology: true,
					useCreateIndex: true,
					useFindAndModify: false
				}
		)
		.then(() => {console.log("Successfully connected to mongodb database!")})
		.catch(err => {console.log("Mongodb connection error: " + err)});




app.use(cors());
app.use(express.json());
app.locals.moment = require("moment");

app.use(require("express-session")({
	secret: "This is my secrete key so please do not tell others",
	resave: false,
	saveUninitialized: false,
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const restaurantRoutes = require("./routes/restaurants");
const commentRoutes = require("./routes/comments");
const userRoutes = require("./routes/users");


app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});


app.use("/restaurants", restaurantRoutes);
app.use("/restaurants/:id/comments", commentRoutes);
app.use("/", userRoutes);



app.listen(process.env.PORT || 3000, process.env.IP, () => {
	console.log("The restaurant review Node server is running!");
});