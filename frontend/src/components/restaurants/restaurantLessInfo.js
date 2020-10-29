import React from "react";
import {Link} from "react-router-dom";


const Restaurant = props => (
	<div className="col-md-3 col-sm-6">
			<div className="thumbnail">
				<img src={props.restaurant.image} alt="Error, url not working!"/>
				<div>
					<h4 className="caption">
						<strong>{props.restaurant.name}</strong>
					</h4>
				</div>
				<div>
					<h5>{props.restaurant.flavor}</h5>
				</div>
				<p>
					<Link to={"/restaurants/" + props.restaurant._id} className="btn btn-primary">More Info</Link>
				</p> 
			</div>
	</div>
)


export default Restaurant