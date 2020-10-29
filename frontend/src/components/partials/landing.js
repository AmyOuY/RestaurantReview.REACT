import React from "react";
import {Link} from "react-router-dom";


const Landing = () => (	
	<div className="container">
		<div id="landing-header">
			<h1>
				Welcome to YelpRestaurant
			</h1>
			<Link to="/restaurants">View All Restaurants</Link>
		</div>
		<img id="landingImage" src="https://www.photosforclass.com/download/px_370984" alt="Error, url not working!"/>
	</div>
)


export default Landing