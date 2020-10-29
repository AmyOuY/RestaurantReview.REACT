import React, {Component} from "react";
import axios from "axios";
import {UserContext} from "../../context/userContext";
import RestaurantList from "../restaurants/restaurantList";
import Message from "../../components/partials/message";


class Login extends Component{
	static contextType = UserContext;

	state = {
		user: null
	};

	constructor(props){
		super(props);
		this.state = {
			username: "",
			password: "",
			message: ""
		};
		
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	

	
	onChange(event){
		const {name, value} = event.target;
		this.setState({[name]: value});
	}
	
	
	async onSubmit(event){	
		event.preventDefault();
		
		const newUser = {
			username: this.state.username,
			password: this.state.password,
		};	
				
		await axios.post("https://webdeveloperbootcamp-ppica.run-us-west2.goorm.io/login", newUser)
			.then(response => {
				this.context.setUser(response.data);
				this.setState({message: "Welcome, " + this.state.username})
			})
			.catch(err => {
				this.setState({message: "Error: invalid username or password!"})
				setTimeout(function(){
					this.setState({message: ""})		
				}.bind(this),3000);
			});	
		
		this.setState({
			username: "",
			password: ""
		});
	}
	
	

	render(){
		return(					
			<div>				
				{this.context.user? <RestaurantList /> :
				
					<div className="form-head">
						<h3 className="h3-head">Login</h3>
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
									<button className="btn btn-lg btn-primary btn-block">
										Login
									</button>
								</div>
							</form>	
					
					{this.state.message ? <Message message={this.state.message} success={false}/> : null}
					</div>			
					
				}			
			</div>			
		)
	}
}


export default Login