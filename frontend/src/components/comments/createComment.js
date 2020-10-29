import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../../context/userContext";



class CreateComment extends Component{
	static contextType = UserContext;

	constructor(props){
		super(props);
		
		this.state = {
			restaurant_name: "",
			text: "",
			author_id: "",
			author_name: ""
		};
		
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	
	componentDidMount(){
		axios.get("https://webdeveloperbootcamp-ppica.run-us-west2.goorm.io/restaurants/" + this.props.match.params.id)
			.then(response => {
				this.setState({
					restaurant_name: response.data.name
				})
		});
	}
	
	
	onChange(event){
		const {name, value} = event.target;
		this.setState({[name]: value});
	}
	
	
	async onSubmit(event){
		event.preventDefault();
		
		const comment = {
			text: this.state.text,
			author_id: this.context.user.user._id,
			author_name: this.context.user.user.username
		};
		
		await axios.post("https://webdeveloperbootcamp-ppica.run-us-west2.goorm.io/restaurants/" + this.props.match.params.id + "/comments/", comment)
			.then(response => console.log(response.data))
			.catch(err => console.log("Error: " + err));
		
		
		this.setState({
			restaurant_name: "",
			text: "",
			author_id: "",
			author_name: ""
		});		
		
		this.props.history.push("/restaurants/" + this.props.match.params.id);	
	}
	
	
	render(){		
		return(
			<div className="form-head">
				<h3 className="h3-head">
					Add New Comment to {this.state.restaurant_name}
				</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<input 
							type="text"
							className="form-control" 
							required
							placeholder="text"
							name="text" 
							value={this.state.text}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<button className="btn btn-primary btn-lg btn-block">
							Submit
						</button>
					</div>
				</form>
				<Link to={"/restaurants/" + this.props.match.params.id}>Go Back</Link>
			</div>
		)
	}
}


export default CreateComment