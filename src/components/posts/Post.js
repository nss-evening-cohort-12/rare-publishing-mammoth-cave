import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'
import './Post.css';

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

  toggleApproved = (e) => {
    const { post } = this.props
    fetch(`http://127.0.0.1:8000/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        {
        approved: !post.approved,
        }
      )
    })
  }


  render() {
    const isAdmin = (localStorage.getItem("isAdmin") === "true")
    const { post } = this.props;
    const user_id = localStorage.getItem('user_id')
    const postDetails = `/viewpost/${post.id}`
    const editPost = `/editpost/${post.id}`
    const creation_date = moment(post.publication_date).format('L');
    if ( isAdmin || Number(user_id) === post.user_id.id){ 
        return(
          <div className="post-list">
          <div className="d-flex">
          <div className="col-2 editDelete">
          <span><i className="fas fa-trash-alt mr-3" onClick={this.deletePostEvent}></i>
          <Link to={editPost}><i className="fas fa-edit"></i></Link>        
          </span>
          </div>
      
          <div className=" col-10 post">
      
          <h6>{post.user_id.user_id.first_name} {post.user_id.user_id.last_name}</h6>
          <Link to={postDetails}><h6 className="col-2">{post.title}</h6></Link>
          <h6 className="col-2 text-center">{creation_date}</h6>
          <h6>{post.category_id.label}</h6>
          <h6>{post.tags.map(tag => <h6>{tag.label}</h6>)}</h6>
          
          <div>{
              isAdmin
             ?
             <input className="form-check-input" type="checkbox" onChange={this.toggleApproved} defaultChecked={post.approved}  id={post.id} />
             :
            ""
            }</div>
          </div>
          </div>
          </div>
        )
          }
  else{
          return(
        <div className="post-list">
        <div className="col-12 post">
      
        <h5>{post.user_id.user_id.first_name} {post.user_id.user_id.last_name}</h5>
        <Link to={postDetails}><h5>{post.title}</h5></Link>
        <h5>{creation_date}</h5>
        <h5>{post.category_id.label}</h5>
        <h5>{post.tags.map(tag => <h5>{tag.label}</h5>)}</h5>
        </div>
      </div>
    )
    }
}
}

export default withRouter(Post);
