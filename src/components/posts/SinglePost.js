import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import './SinglePost.css';
import 'react-confirm-alert/src/react-confirm-alert.css'

class SinglePost extends React.Component {
  state = {
    post: {},
  }

  componentDidMount() {
    this.getPostById()
  }

  getPostById = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8088/posts/${postId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({ post: res })
    })
  }

  deletePostClickEvent = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8088/posts/${postId}`, {
      method: "DELETE"
    }).then(() => {
      this.props.history.push('/posts');
    })
  }

  submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Delete?</h1>
            <p>Are you sure you want to proceed?</p>
            <button className="mr-3 dialog-btn" onClick={onClose}><h4>No</h4></button>
            <button className="dialog-btn"
              onClick={() => {
                this.deletePostClickEvent();
                onClose();}}>
                  <h4>Yes, Delete this post</h4>
            </button>
          </div>
        );
      }
    });
  };

  render() {
    const { postId } = this.props.match.params;
    const { post } = this.state;
    const creation_date = moment(post.creation_date).format('MMM Do, YYYY');
    return (
      <div className="full-post">
        <h1>{post.subject}</h1>
        <h5>{post.content}</h5>
        <h4 className="mt-4">{creation_date}</h4>
        <div className="post-options">
          <i className="fas fa-trash-alt mr-3" onClick={this.submit}></i>
          <i className="fas fa-edit"></i>
        </div>
      </div>
    )
  }
}

export default withRouter(SinglePost);
