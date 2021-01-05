import React from 'react';
import { withRouter } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

import moment from 'moment';

import 'react-confirm-alert/src/react-confirm-alert.css'

class Comment extends React.Component {
  state = {
    newCommentSubject: '',
    newCommentContent: '',
  }
  
  changeCommentContent = (e) => {
    e.preventDefault();
    this.setState({ newCommentContent: e.target.value });
  }

  deleteCommentEvent = () => {
    const { deleteComment, comment } = this.props
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Delete?</h1>
            <p>Are you sure you want to proceed?</p>
              <button className="mr-3 dialog-btn" 
                onClick={onClose}><h4>No</h4>
              </button>
              <button className="dialog-btn"
                onClick={() => {
                  deleteComment(comment.id);
                  onClose();}}>
                    <h4>Yes, Delete this Comment</h4>
              </button>
          </div>
        );
      }
    });
  };

  editComment = () => {
    const { newCommentContent, newCommentSubject} = this.state
    const user_id = localStorage.getItem("user_id")
    const creation_date = Date.now()
    const{ postId } = this.props.match.params;
    const { comment, getCommentsByPostId } = this.props

    const editedComment = {
      user_id,
      post_id: this.props.match.params.postId,
      created_on: moment(creation_date).format('YYYY-MM-DDThh:mm'),
      subject: `${comment.subject}`,
      content: newCommentContent,
    }

    fetch(`http://localhost:8000/comments/${comment.id}`, {
      method: "PUT",
      headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(
        editedComment
      )
    })
      .then(res => res.json())
      .then(res => {
        this.props.history.push(`/comments/${postId}`)
        getCommentsByPostId()
      })
  }

  editCommentEvent = (e) => {
    const { comment } = this.props
    // const { newCommentContent } = this.state
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Edit? {comment.subject}</h1>
            <form>
            <textarea
                type="text"
                className="form-control"
                id="content"
                placeholder={comment.content}
                // value={newCommentContent}
                onChange={this.changeCommentContent}
              />
            <p>Are you sure you want to proceed?</p>
              <button className="mr-3 dialog-btn" 
                onClick={onClose}><h4>No</h4>
              </button>
              <button className="dialog-btn"
                onClick={() => {
                  this.editComment();
                  onClose();}}>
                    <h4>Yes, Edit this Comment</h4>
              </button>
              </form>
          </div>
        );
      }
    });
  };

  render () {
    const { comment } = this.props;
    const creation_date = moment(comment.creation_date).format('MMM Do, YYYY');

    return (
    <div className="comment">
      <h4>{comment.subject}</h4>
      <h5>{comment.user_id && comment.user_id.user_id.first_name} {comment.user_id && comment.user_id.user_id.last_name} </h5>
      <h6>{creation_date} 
      {comment.user_id.id == localStorage.getItem("user_id") ?
        <div className="deleteEditButtons">
          <i className="fas fa-edit" onClick={this.editCommentEvent}></i>
          <i className="fas fa-trash-alt mr-3" onClick={this.deleteCommentEvent}></i>
        </div>
          : <div></div>}
      </h6>
      <p>{comment.content}</p>
    </div>
    )
  }
    
}

export default withRouter(Comment);
 