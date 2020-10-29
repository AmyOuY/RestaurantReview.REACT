import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {nav} from "bootstrap";
import axios from "axios";
import {UserContext} from "../../context/userContext";


class Navbar extends Component{
	static contextType = UserContext;

	constructor(props){
		super(props);
		
		this.onClick = this.onClick.bind(this);
	}


	onClick(){		
		axios.get("https://webdeveloperbootcamp-ppica.run-us-west2.goorm.io/logout");
		
		this.context.user = null;
				
		this.props.history.push("/restaurants");
	}


	render(){	
		return(
			<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
				<Link to="/restaurants" className="navbar-brand">YelpRestaurant</Link>
				<button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#links"
					aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle Navigation">
					<span className="navbar-toggler-icon"></span>
				</button>				
				<div className="collapse navbar-collapse" id="links">
					<ul className="navbar-nav mr-auto">
						<li className="navbar-item">
							<Link to="/restaurants" className="nav-link">Home</Link>
						</li>
					</ul>				
									
						{!this.context.user ? 
							<div className="navbar-nav ml-auto">
								<li className="navbar-item">
									<Link to="/users/login" className="nav-link">Login</Link>
								</li>					
								<li className="navbar-item">
									<Link to="/users/register" className="nav-link">Sign Up</Link>
								</li>
							</div>
							:
							<div className="navbar-nav ml-auto">
								<li><Link to="#">Signed in as {this.context.user.user.username}</Link></li>
								<li className="navbar-item">
									<Link to="#" className="nav-link" onClick={this.onClick}>Logout</Link>
								</li>
							</div>
						}						
					
				</div>
			</nav>
		)
	}
}


export default withRouter(Navbar)