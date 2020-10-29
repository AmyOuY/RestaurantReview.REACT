import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import axios from "axios";
import Restaurant from "./restaurantLessInfo";
import {UserContext} from "../../context/userContext";
import Message from "../../components/partials/message";



class RestaurantList extends Component {
	static contextType = UserContext;

	constructor(props) {
		super(props);
		this.state = {
			restaurants: [],
			message: "",
			searchName: ""
		};
		
		this.onClick = this.onClick.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		this.source = axios.CancelToken.source();
	}
	
	
	componentDidMount() {		
		axios.get("https://webdeveloperbootcamp-ppica.run-us-west2.goorm.io/restaurants",
				 {cancelToken: this.source.token})
			.then(response => {
				this.setState({restaurants: response.data})
			})
			.catch(err => console.log("Error: " + err));
	}
	

	componentWillUnmount(){
		this.source.cancel("Component Unmounted");
	}
	

	componentDidUpdate(){
        this.componentDidMount();
	}	


	restaurantList(){
		return this.state.restaurants.map(restaurant => {
			return <Restaurant key={restaurant._id} restaurant={restaurant}/>
		});
	}
	

	onChange(event){
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	
	 async onSubmit(event){
		event.preventDefault();
		
		const search = {
			name: this.state.searchName
		};
		
		await axios.post("https://webdeveloperbootcamp-ppica.run-us-west2.goorm.io/restaurants/search", search, {cancelToken: this.source.token})
			.then(response => {				
				this.setState({restaurants: response.data})
			})
			.catch(err => console.log("Error: " + err));
		
		this.props.history.push("/restaurants/search", {restaurants: this.state.restaurants});	
	}



	onClick(){
		if (!this.context.user){
			this.setState({message: "You need to be logged in to add new restaurant!"});
			
			setTimeout(function(){
				this.props.history.push("/users/login");		
			}.bind(this),3000);
		}
		else{
			this.props.history.push("/restaurants/create");
		}
	}
	

	render(){
		return(
			<div className="container">
				<header className="jumbotron text-center">
					<div className="container">
						<h1>Welcome to YelpRestaurant</h1>
						<p>View our hand-picked restaurants in the region of Montreal</p>
						{this.state.message ? <Message message={this.state.message} success={false}/> : null}
						<Link to="#" className="btn btn-primary btn-lg" onClick={this.onClick}>Add New Restaurant</Link>
						
						<form onSubmit={this.onSubmit} className="form-inline justify-content-center mt-3">
							<div className="form-group">
								<input 
									type="text"
									className="form-control" 
									name="searchName" 
									value={this.state.searchName}
									placeholder="Search Restaurant..." 
									onChange={this.onChange}
								/>
							</div>

							<button type="submit" className="btn btn-info ml-2">Search</button>		
						</form>								
					</div>
				</header>				
				<div className="row text-center restaurantDisplay">
					{this.restaurantList()}
				</div>
			</div>
		)
	}
}


export default withRouter(RestaurantList)