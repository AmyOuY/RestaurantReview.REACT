import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";


const Comment =  props =>  {			
	let showButtons;

	if (!props.context.user) {
		showButtons = false;
	}
	else{
		if (props.comment.author.id === props.context.user.user._id || props.context.user.user.isAdmin){
			showButtons = true;
		}
		else{
			showButtons = false;
		}
	}
		
	return(			
		<div className="row">
			<div className="col-md-12">			
				<strong>{props.comment.author.username}</strong>
				<span className="float-right">{moment(props.comment.createdDate).fromNow()}</span>				
				<p>{props.comment.text}</p>									
				
				{showButtons ? 
					<div>
						<Link className="btn btn-sm btn-warning" 
							to={"/restaurants/" + props.restaurant_id + "/comments/" + props.comment._id + "/edit"}>Edit</Link>

						<Link className="btn btn-sm btn-danger btn-delete" 
							to={"/restaurants/" + props.restaurant_id} 
							onClick={() => {props.deleteComment(props.comment._id)}}>Delete</Link>						
					</div> 
					: null
				}
				
			</div>
		</div>
	)	
}


export default Comment