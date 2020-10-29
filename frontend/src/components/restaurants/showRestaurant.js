import React, {Component} from "react";
import axios from "axios";
import Restaurant from "./restaurantMoreInfo";
import Comment from "./comment";
import {UserContext} from "../../context/userContext";



class ShowRestaurant extends Component {
	static contextType = UserContext;
	
	constructor(props){
		super(props);
		this.state = {
			id: "",
			name: "",
			image: "",
			flavor: "",
			address: "",
			description: "",
			author: "",
			createdDate: "",
			comments: []
		};
		
		this.deleteComment = this.deleteComment.bind(this);
		this.deleteRestaurant = this.deleteRestaurant.bind(this);
		
		this.source = axios.CancelToken.source();
	}
	
	
	componentDidMount(){	
		axios.get("https://webdeveloperbootcamp-ppica.run-us-west2.goorm.io/restaurants/" + this.props.match.params.id,
				 {cancelToken: this.source.token})
			.then(response => {
				this.setState({
					id: response.data._id,
					name: response.data.name,
					image: response.data.image,
					flavor: response.data.flavor,
					address: response.data.address,
					description: response.data.description,
					author: response.data.author,
					createdDate: response.data.createdDate,
					comments: response.data.comments
				})
			})
			.catch(err => console.log("Error: " + err));		
	}
	

	componentWillUnmount(){
		this.source.cancel("Component Unmounted");
	}


	componentDidUpdate(){
        this.componentDidMount();
	}	


	async deleteRestaurant(id) {
		await axios.delete("https://webdeveloperbootcamp-ppica.run-us-west2.goorm.io/restaurants/" + id)
			.then(response => console.log(response.data))
			.catch(err => console.log("Error: " + err));
		
	}



	async deleteComment(id) {
		await axios.delete("https://webdeveloperbootcamp-ppica.run-us-west2.goorm.io/restaurants/" + this.props.match.params.id + "/comments/" + id)
			.then(response => console.log(response.data))
			.catch(err => console.log("Error: " + err));
		
		this.setState({
			comments: this.state.comments.filter(comment => comment._id !== id)
		})
		
	}


	
	commentList(){
		return this.state.comments.map(comment => {
			return <Comment key={comment._id} comment={comment} restaurant_id={this.state.id} context={this.context} deleteComment={this.deleteComment}/>
		});
	}
	
	
	render(){		
		return (
			<div className="container">
				<Restaurant key={this.state.id} restaurant_id={this.state.id} name={this.state.name} image={this.state.image} flavor={this.state.flavor} address={this.state.address} description={this.state.description} author={this.state.author} createdDate={this.state.createdDate} context={this.context} commentList={this.commentList()} deleteRestaurant={this.deleteRestaurant}/>
			</div>
			
		)
		
	}
}


export default ShowRestaurant