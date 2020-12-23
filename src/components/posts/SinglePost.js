import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import './SinglePost.css';
import 'react-confirm-alert/src/react-confirm-alert.css'

class SinglePost extends React.Component {
  state = {
    post: {},
    comments: [],
    commentSubject: '',
    newComment: '',
    editing: false,
    editingComment: {},
  }

  componentDidMount() {
    this.getPostById()
    // this.getCommentsByPostId()
  }

  changeComment = (e) => {
    e.preventDefault();
    this.setState({ newComment: e.target.value });
  }

  changeCommentSubject = (e) => {
    e.preventDefault();
    this.setState({ commentSubject: e.target.value });
  }
  // getCommentsByPostId = () => {
  //   const { postId } = this.props.match.params;
  //   return fetch(`http://localhost:8000/comments?post_id=${postId}`)
  //   .then(res => res.json())
  //   .then(res => {
  //     this.setState({ comments: res })
  //   })
  // }

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
    const { comments } = this.state
    return fetch(`http://localhost:8000/posts/${postId}`, {
      method: "DELETE",
        headers: {
          "Authorization": `Token ${localStorage.getItem("rare_user_id")}`}
    }).then(() => {
      comments.forEach((comment) => {
        fetch(`http://localhost:8000/comments/${comment.id}`, {
          method: "DELETE"
      }
      )})
      this.props.history.push('/posts');
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

  cancelEdit = () => {
    this.setState({ editing: false })
    this.setState({ editingComment: {}})
    this.setState({ commentSubject: '' })
    this.setState({ newComment: ''})
  }

  editComment = (comment) => {
    this.setState({ editing: true })
    this.setState({ editingComment: comment})
    this.setState({ commentSubject: comment.subject })
    this.setState({ newComment: comment.content})
  }

  render() {
    const { post, editing } = this.state;
    const editPost = `/editpost/${post.id}`
    const comments = `/comments/${post.id}`
    const creation_date = moment(post.creation_date).format('MMM Do, YYYY');

    return (
      <div className="single-post">
        <div className="post-content">
          <h3 className="subject">{post.title}</h3>
          <p>{post.content}</p>
          <h5>{post.user_id && post.user_id.user_id.first_name} {post.user_id && post.user_id.user_id.last_name}</h5>
          <h6 className="text-muted mt-4">{creation_date}</h6>
        </div>
        <div className="post-options">
          <i className="fas fa-trash-alt mr-3" onClick={this.deletePostEvent}></i>
          <Link to={editPost}><i className="fas fa-edit"></i></Link>
        </div>
        <div>
        <Link to= {comments}><button className="btn-primary"> Comments </button></Link>
        </div>
      </div>
      
    )
  }
}

export default withRouter(SinglePost);
