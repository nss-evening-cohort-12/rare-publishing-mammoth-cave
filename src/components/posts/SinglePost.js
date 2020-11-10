import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import Comment from '../comments/Comment'
import './SinglePost.css';
import 'react-confirm-alert/src/react-confirm-alert.css'

class SinglePost extends React.Component {
  state = {
    post: {},
    comments: [],
  }

  componentDidMount() {
    this.getPostById()
    this.getCommentsByPostId()
  }

  getCommentsByPostId = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8088/comments?post_id=${postId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({ comments: res })
    })
  }

  getPostById = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8088/posts/${postId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({ post: res })
    })
  }

  deletePost = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8088/posts/${postId}`, {
      method: "DELETE"
    }).then(() => {
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

  render() {
    const { post, comments } = this.state;
    const creation_date = moment(post.creation_date).format('MMM Do, YYYY');
    const commentString = comments.map((comment) => <Comment key={comment.id} comment={comment} />)
    return (
      <div className="full-post">
        <h1>{post.subject}</h1>
        <h5>{post.content}</h5>
        <h4 className="mt-4">{creation_date}</h4>
        <div className="post-options">
          <i className="fas fa-trash-alt mr-3" onClick={this.deletePostEvent}></i>
          <i className="fas fa-edit"></i>
        </div>
        <div>
          New Comment Here:
        </div>
        {commentString}
      </div>
    )
  }
}

export default withRouter(SinglePost);
