import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import './SinglePost.css';
import 'react-confirm-alert/src/react-confirm-alert.css'

class SinglePost extends React.Component {
  state = {
    post: {},
    tags: [],
  }

  componentDidMount() {
    this.getPostById()
  }


  getPostById = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8000/posts/${postId}`, {   
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`}
      }
        )
    .then(res => res.json())
    .then(res => {
      this.setState({ post: res })
    })
  }

  deletePost = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8000/posts/${postId}`, {
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
    const { post } = this.state;
    const isAdmin = (localStorage.getItem("isAdmin") === "true")
    const editPost = `/editpost/${post.id}`
    const comments = `/comments/${post.id}`
    const userDetails = `/users/${post.user_id}`
    return (
      <>
      <div className="container d-flex">
      <div className="post d-flex flex-column col-10">
      <div className="form-check mb-3">
              {
                isAdmin ? (
                  post.approved ? (
                    <h6>Approved</h6>
                  ) : (
                    <h6>Not Approved</h6>
                  )
                ) : (
                  ""
                )
              }
            </div>
        <div className="post-header">
          <h2 className="subject text-center">{post.title}</h2>
        </div>
        <div className="post-options d-flex justify-content-between">
          <span><i className="fas fa-trash-alt mr-3" onClick={this.deletePostEvent}></i>
          <Link to={editPost}><i className="fas fa-edit"></i></Link>        
          </span>
          <h3 className="category">{post.category_id && post.category_id.label}</h3>
        </div>
        <div className="text-center">
        <img src={post.image_url} />
        </div>
        <div className="d-flex justify-content-between">
          <span>By <Link to={userDetails}>{post.user_id && post.user_id.user_id.first_name} {post.user_id && post.user_id.user_id.last_name}</Link></span>
          <Link to= {comments}><button className="btn-primary">View Comments</button></Link>
          <div className="reactions">Reactions To Come</div>
        </div>
        </div>
        <div className="postTags d-flex">
          <ul style={{"list-style-type": "none"}}>
          {post.tags && post.tags.map(tag => <li className="tag">{tag.label}</li>)}
          </ul>
        </div>
        </div>
        <div className="postContent text-center col-10">
        <p className="col-10">{post.content}</p>
    </div>
    </>
    )
  }
}

export default withRouter(SinglePost);
