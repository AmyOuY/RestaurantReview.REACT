import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./components/partials/landing";
import Navbar from "./components/partials/navbar";
import Register from "./components/users/register";
import Login from "./components/users/login";
import CreateRestaurant from "./components/restaurants/createRestaurant";
import RestaurantList from "./components/restaurants/restaurantList";
import SearchRestaurant from "./components/restaurants/searchRestaurant";
import ShowRestaurant from "./components/restaurants/showRestaurant";
import EditRestaurant from "./components/restaurants/editRestaurant";
import CreateComment from "./components/comments/createComment";
import EditComment from "./components/comments/editComment";
import {UserContext} from "./context/userContext";
import "./stylesheets/main.css";




class App extends Component {
	
	setUser = (user) => {
		this.setState({user})
	}
	
	state = {
		user: null,
		setUser: this.setUser
	
	}
	
	render(){	
		return(		
			<Router>
			    <UserContext.Provider value={this.state} >
					<Switch>
						<Route exact path="/" component={Landing} />
    					<Route component={Navbar} />
					</Switch>
				    <Route path="/users/register" component={Register} />
				    <Route path="/users/login" component={Login} />
					<Switch>
						<Route path="/restaurants" exact component={RestaurantList} />
						<Route path="/restaurants/search" component={SearchRestaurant} />
						<Route path="/restaurants/create" component={CreateRestaurant} />
						<Route path="/restaurants/:id" exact component={ShowRestaurant} />
						<Route path="/restaurants/:id/edit" component={EditRestaurant} />
						<Route path="/restaurants/:id/comments/create" component={CreateComment} />
						<Route path="/restaurants/:id/comments/:comment_id/edit" component={EditComment} />
					</Switch>
				    
			    </UserContext.Provider>		 
		    </Router>
  		)		
	}	  
}


export default App;
