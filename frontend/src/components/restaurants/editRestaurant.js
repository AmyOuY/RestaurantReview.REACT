import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";


class EditRestaurant extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: "",
			image: "",
			flavor: "",
			address: "",
			description: "", 
		};
		
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	
	
	componentDidMount(){
		axios.get("https://webdeveloperbootcamp-ppica.run-us-west2.goorm.io/restaurants/" + this.props.match.params.id)
			.then(response => {
				this.setState({
					name: response.data.name,
					image: response.data.image,
					flavor: response.data.flavor,
					address: response.data.address,
					description: response.data.description
				})
			})
			.catch(err => console.log("Error: " + err));
	}
	
	
	
	onChange(event){
		const {name, value} = event.target;
		this.setState({[name] : value});
	}
	
	
	onSubmit(event){
		event.preventDefault();
		
		const restaurant = {
			name: this.state.name,
			image: this.state.image,
			flavor: this.state.flavor,
			address: this.state.address,
			description: this.state.description
		};
		
		axios.post("https://webdeveloperbootcamp-ppica.run-us-west2.goorm.io/restaurants/" + this.props.match.params.id + "/update", restaurant)
			.then(response => console.log(response.data))
			.catch(err => console.log("Error: " + err));
		
		
		this.setState({
			name: "",
			image: "",
			flavor: "",
			address: "",
			description: "",
		})
		
		this.props.history.push("/restaurants/" + this.props.match.params.id);
	}
	
	
	render(){
		return(
			<div className="form-head">
				<h3 className="h3-head">Edit Restaurant {this.state.name}</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							required
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
							name="description"
							value={this.state.description}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<input type="submit" value="Edit Restaurant" className="btn btn-lg btn-primary btn-block" />
					</div>
				</form>
				<Link to={"/restaurants/" + this.props.match.params.id}>Go Back</Link>	
			</div>
		)
	}
}


export default EditRestaurant