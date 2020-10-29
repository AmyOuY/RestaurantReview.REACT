import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import moment from "moment";
import Message from "../../components/partials/message";


class Restaurant extends Component {	
	constructor(props){
		super(props);
		
		this.state = {
			message: ""
		};
		
		this.onClick = this.onClick.bind(this);
	}
	
	
	onClick(){
		if (!this.props.context.user){
			this.setState({message: "You need to be logged in to add new comment!"});
			
			setTimeout(function(){
				 this.props.history.push("/users/login");	
			}.bind(this),3000);
		}
		else{
			this.props.history.push("/restaurants/" + this.props.restaurant_id + "/comments/create");
		}
	}
	
	
	render(){
		let showButtons;

		if (!this.props.context.user) {
			showButtons = false;
		}
		else{
			if (this.props.author.id === this.props.context.user.user._id || this.props.context.user.user.isAdmin){
				showButtons = true;
			}
			else{
				showButtons = false;
			}
		}

		return(
			<div className="row">
				<div className="col-md-3">
					<p className="lead">YelpRestaurant</p>
					<div className="list-group">
						<li className="list-group-item active">Info1</li>
						<li className="list-group-item">Info2</li>
						<li className="list-group-item">Info3</li>
					</div>
				</div>
				<div className="col-md-9">
					<div className="thumbnail">
						<img className="img-responsive" src={this.props.image} alt="Error, url not working!" />
						<div className="caption-full">
							<h4 className="text-right"><em>{this.props.address}</em></h4>
							<h2><strong id="restaurantName">{this.props.name}</strong></h2>
							<h4 id="restaurantFlavor"><strong>Flavors: </strong>{this.props.flavor} </h4>
							<h5 id="restaurantDescription">{this.props.description}</h5>	
							<p><em>Submitted By {this.props.author.username},  {moment(this.props.createdDate).fromNow()}</em></p>

							{showButtons ? 
								<div>
									<Link className="btn btn-sm btn-warning" 
										to={"/restaurants/" + this.props.restaurant_id + "/edit"}>Edit</Link>					
									<Link className="btn btn-sm btn-danger btn-delete" 
										to={"/restaurants"} 
										onClick={() => {this.props.deleteRestaurant(this.props.restaurant_id)}}>Delete</Link>
								</div>

							 : null
							}

						</div>
					</div>
					<div className="card bg-light card-body">
						{this.state.message ? <Message message={this.state.message} success={false}/> : null}
						<div className="text-right">
							<Link className="btn btn-success" to="#" onClick={this.onClick}>Add New Comment</Link>
						</div>
						<hr />

						<div className="comments">
							{this.props.commentList}
						</div>
					</div>
				</div>
			</div>
		)
	}
	
}


export default withRouter(Restaurant)