import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'
import './PostCard.css';

class Post extends React.Component {
  
  deletePost = () => {
    const { post } =this.props
    return fetch(`http://localhost:8000/posts/${post.id}`, {
      method: "DELETE",
        headers: {
          "Authorization": `Token ${localStorage.getItem("rare_user_id")}`}
    }).then(() => {
      this.props.history.push('/posts')
    })
  }

  deletePostEvent = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Delete?</h1>
            <p>Are you sure you want to proceed?</p>
            <button className="mr-3 dialog-btn" onClick={onClose}><h4>No</h4></button>
            <button className="dialog-btn"
              onClick={() => {
                this.deletePost();
                onClose();}}>
                  <h4>Yes, Delete this post</h4>
            </button>
          </div>
        );
      }
    });
  };


  render() {
    const isAdmin = (localStorage.getItem("isAdmin") === "true")
    const { post, isEditable } = this.props;
    const user_id = localStorage.getItem('user_id')
    const postDetails = `/viewpost/${post.id}`
    const editPost = `/editpost/${post.id}`
    const creation_date = moment(post.publication_date).format('L');
  
    return(
        <div className="card w-100 h-100">
       <div className="postCard d-flex flex-wrap justify-content-between w-100 h-100">
          <div className="title mr-auto m-4"><h2> {post.title}</h2></div>
          <div className="postDate m-4  text-right"><h4>Publication Date: {post.publication_date}</h4></div>
          <div className="postImg justify-content-center col-12"> <img src={post.image_url} /></div>
          <div className="author m-5 float-left"><h5>Author: {post.user_id.user_id.first_name} {post.user_id.user_id.last_name}</h5></div>
          <div className="d-flex justify-content-aroundt m-5">
          <div className="reactionCount float-left m-4"> reaction count</div>
          <div className="editDelete m-4"> {isEditable ? <span>
          <Link to={editPost}><i className="fas fa-edit"></i></Link>    
          <i className="fas fa-trash-alt mr-3" onClick={this.deletePostEvent}></i> 
          </span>
          :
          ""}</div>
          </div>
       </div>
       </div>
    )
  }
}


export default withRouter(Post);
