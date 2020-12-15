import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'


class Comment extends React.Component {
  

  deletePostEvent = () => {
    const { deleteComment, comment } = this.props
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Delete?</h1>
            <p>Are you sure you want to proceed?</p>
            <button className="mr-3 dialog-btn" onClick={onClose}><h4>No</h4></button>
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

  editEvent = (e) =>
  {
    e.preventDefault();
    const {comment, editComment } = this.props
    editComment(comment)
  }

  render() {
    const { comment } = this.props;
    const creation_date = moment(comment.creation_date).format('MMM Do, yyyy');
    return(
      <div className="comment">
        <h5>{comment.subject}</h5>
        <h6>{`${comment.user.first_name} ${comment.user.last_name} - ${creation_date}`}
        {comment.user_id === localStorage.getItem("rare_user_id") ?
          <>
          <i className="fas fa-edit" onClick={this.editEvent}></i>
          <i className="fas fa-trash-alt mr-3" onClick={this.deletePostEvent}></i>
          </>
        : <div></div>}
        </h6>
        <p>{comment.content}</p>
      </div>
    )
  }
}

export default withRouter(Comment);
