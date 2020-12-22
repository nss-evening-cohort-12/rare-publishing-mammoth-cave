import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import Comment from '../comments/Comment'
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

  getAllTags = () => {
    return fetch("http://localhost:8000/tags", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
    .then(res => {
        this.setState({ tags: res.results })
    })
}

  getPostById = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8000/posts/${postId}`, {   
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`}
      }
        )
    .then(res => res.json())
    .then(res => {
      this.setState({ post: res })
      this.getAllTags()
    })
  }

  deletePost = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8000/posts/${postId}`, {
      method: "DELETE",
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`}
    }).then(this.props.history.push('/posts'));
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
    const { post, tags} = this.state;
    const editPost = `/editpost/${post.id}`
    console.warn(post)
    return (
      <>
      <div className="container d-flex justify-content-around">
      <div className="post d-flex flex-column col-10">
        <div className="post-header">
          <h2 className="subject">{post.title}</h2>
        </div>
        <div className="post-options d-flex justify-content-between col-9">
          <span><i className="fas fa-trash-alt mr-3" onClick={this.deletePostEvent}></i>
          <Link to={editPost}><i className="fas fa-edit"></i></Link>        
          </span>
          <h3 className="category">{post.category_id && post.category_id.label}</h3>
        </div>
        <div className="text-center">
        <img src={post.image_url} />
        </div>
        <div className="d-flex justify-content-between col-9">
          <span>By {post.user_id && post.user_id.user_id.first_name} {post.user_id && post.user_id.user_id.last_name}</span>
          <button>View Comments</button>
          <div>Reactions To Come</div>
        </div>
        </div>
        <div className="postTags d-flex col-3">
          <ul style={{"list-style-type": "none"}}>
          {tags.map(tag => post.tags.includes(tag.id) ? <li className="tag">{tag.label}</li> : '')}
          </ul>
        </div>
        </div>
        <div className="postContent text-center col-10">
        <p>{post.content}</p>
    </div>
    </>
    )
  }
}

export default withRouter(SinglePost);
