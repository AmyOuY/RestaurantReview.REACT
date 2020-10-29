import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";


class EditComment extends Component{
	constructor(props){
		super(props);
		
		this.state = {
			restaurant_name: "",
			text: ""
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
		
		axios.get("https://webdeveloperbootcamp-ppica.run-us-west2.goorm.io/restaurants/" + this.props.match.params.id + "/comments/" + this.props.match.params.comment_id)
			.then(response => {
				this.setState({
					text: response.data.text
				})
		});
	}
	
	
	onChange(event){
		const {name, value} = event.target;
		this.setState({[name]: value});
	}
	
	
	onSubmit(event){
		event.preventDefault();
		
		const comment = {
			text: this.state.text			
		};
		
		axios.post("https://webdeveloperbootcamp-ppica.run-us-west2.goorm.io/restaurants/" + this.props.match.params.id + "/comments/" + this.props.match.params.comment_id + "/update", comment)
			.then(response => console.log(response.data))
			.catch(err => console.log("Error: " + err));
				
		this.props.history.push("/restaurants/" + this.props.match.params.id);
	}
	
	
	render(){
		return(
			<div className="form-head">
				<h3 className="h3-head">
					Edit Comment to {this.state.restaurant_name}
				</h3>			
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<input 
							type="text"
							className="form-control" 
							required
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


export default EditComment