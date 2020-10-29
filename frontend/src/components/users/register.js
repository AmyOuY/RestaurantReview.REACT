import React, {Component} from "react";
import axios from "axios";
import {UserContext} from "../../context/userContext";
import Message from "../../components/partials/message";



class Register extends Component{
	static contextType = UserContext;

	constructor(props){
		super(props);
		this.state = {
			username: "",
			password: "",
			adminCode: "",
			message: ""
		};
		
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		this.source = axios.CancelToken.source();
	}
	
	
	onChange(event){
		const {name, value} = event.target;
		this.setState({[name]: value});
	}
	
	
	
async onSubmit(event){
		event.preventDefault();
		
		const user = {
			username: this.state.username,
			password: this.state.password,
			adminCode: this.state.adminCode
		};
		
		const response = await axios.post("https://webdeveloperbootcamp-ppica.run-us-west2.goorm.io/register", user);
			
		if (response.data && response.data.name === "UserExistsError"){
			this.setState({message: response.data.message})

			setTimeout(function(){
				this.setState({message: ""})		
			}.bind(this),3000);

			this.setState({
				username: "",
				password: "",
				adminCo: ""
			})
		}
		else{				
				this.setState({message: "Register succeeded! Please log in to use more functions of the website."})

				setTimeout(function(){
					this.props.history.push("/restaurants");		
				}.bind(this),3000);
		}		
	}
	
	

	render(){
		return(
			<div className="form-head">
				<h3 className="h3-head">Sign Up</h3>				
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<input 
							type="text"
							className="form-control"
							required
							placeholder="username"
							name="username"
							value={this.state.username}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<input 
							type="password"
							className="form-control"
							required
							placeholder="password"
							name="password"
							value={this.state.password}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<input 
							type="text"
							className="form-control"
							placeholder="adminCode"
							name="adminCode"
							value={this.state.adminCode}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<button className="btn btn-lg btn-primary btn-block">
							Sign Up
						</button>
					</div>
				</form>
				{this.state.message ? <Message message={this.state.message} success={false}/> : null}
			</div>				
			
		)
	}
}


export default Register