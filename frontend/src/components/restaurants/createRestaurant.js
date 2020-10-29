import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../../context/userContext";


class CreateRestaurant extends Component {
	static contextType = UserContext;
	
	constructor(props){
		super(props);
		this.state = {
			name: "",
			image: "",
			flavor: "",
			address: "",
			description: "", 
			author_id: "",
			author_name: ""
		};
		
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	
	onChange(event){
		const {name, value} = event.target;
		this.setState({[name] : value});
	}
	
	
	async onSubmit(event){
		event.preventDefault();
		const restaurant = {
			name: this.state.name,
			image: this.state.image,
			flavor: this.state.flavor,
			address: this.state.address,
			description: this.state.description,
			author_id: this.context.user.user._id,
			author_name: this.context.user.user.username
		};
		
		await axios.post("https://webdeveloperbootcamp-ppica.run-us-west2.goorm.io/restaurants", restaurant)
			.then(response => console.log(response.data))
			.catch(err => console.log("Error: " + err));		
		
		this.setState({
			name: "",
			image: "",
			flavor: "",
			address: "",
			description: "",
			author_id: "",
			author_name: ""
		});				
		
		this.props.history.push("/restaurants");	        			
	}
	

	
	render(){
		return(	
			<div className="form-head">
				<h3 className="h3-head">Create New Restaurant</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							required
							placeholder="name"
							name="name"
							value={this.state.name}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							required
							placeholder="image url"
							name="image"
							value={this.state.image}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							required
							placeholder="flavor"
							name="flavor"
							value={this.state.flavor}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							required
							placeholder="address"
							name="address"
							value={this.state.address}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							required
							placeholder="description"
							name="description"
							value={this.state.description}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<input type="submit" value="Create New Restaurant" className="btn btn-lg btn-primary btn-block" />
					</div>
				</form>
				<Link to="/restaurants">Go Back</Link>	
			</div>
				
			
		)
	}
}


export default CreateRestaurant
