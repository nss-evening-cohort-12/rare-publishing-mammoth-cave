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
    comments: [],
    commentSubject: '',
    newComment: '',
    editing: false,
    editingComment: {},
  }

  componentDidMount() {
    this.getPostById()
    this.getCommentsByPostId()
  }

  changeComment = (e) => {
    e.preventDefault();
    this.setState({ newComment: e.target.value });
  }

  changeCommentSubject = (e) => {
    e.preventDefault();
    this.setState({ commentSubject: e.target.value });
  }
  getCommentsByPostId = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8000/comments?post_id=${postId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({ comments: res })
    })
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

  deleteComment = (commentId) => {
    return fetch(`http://localhost:8000/comments/${commentId}`, {
      method: "DELETE"
    }).then(() => this.getCommentsByPostId())
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

  commentSubmit = (e) => {
    e.preventDefault()
    const { editing } = this.state
   
    if(editing) {
      const { newComment, commentSubject, editingComment} = this.state
      const tempObj = {
        subject: commentSubject,
        content: newComment,
        id: editingComment.id,
      }
      console.warn(tempObj)
      fetch(`http://127.0.0.1:8000/comments/${editingComment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        tempObj
      )}).then(() => this.getCommentsByPostId())
    }
    else {
      const { newComment, commentSubject} = this.state
      const tempObj = {
        user_id: localStorage.getItem('rare_user_id'),
        post_id: this.props.match.params.postId,
        creation_date: Date.now(),
        subject: commentSubject,
        content: newComment,
      }
    fetch("http://127.0.0.1:8000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(tempObj)
        }).then(() => this.getCommentsByPostId())
      }
  }

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
    const { post, comments, newComment, commentSubject, editing } = this.state;
    const editPost = `/editpost/${post.id}`
    const creation_date = moment(post.creation_date).format('MMM Do, YYYY');
    const commentString = comments.map((comment) => <Comment key={comment.id} comment={comment} deleteComment={this.deleteComment} editComment={this.editComment} />)
    // console.warn(post)
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
        <form className="comment-form">
          <div className="form-group">
          {editing ? <h5>Edit Your Comment</h5> : <h5>Add A New Comment:</h5>}
          <h6>Subject:</h6>
          <input type="text" name="subjectInput" className="form-control col-5" id="commentSubject" value={commentSubject} onChange={this.changeCommentSubject}/>
          <h6>Comment:</h6>
          <textarea id="newComment" name="comment" row="5" className="col-6" value={newComment} onChange={this.changeComment}/><br></br>
          <button onClick={this.commentSubmit}>{editing ? "Save": "Add"} Comment</button> <button onClick={this.cancelEdit}>Cancel</button> 
          </div>
          </form>
        </div>
        {commentString}
      </div>
      
    )
  }
}

export default withRouter(SinglePost);
