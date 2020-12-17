import React from 'react';
import { withRouter } from 'react-router-dom';

import moment from 'moment';

// import 'react-confirm-alert/src/react-confirm-alert.css'

class Comment extends React.Component {

  render () {
    const { comment } =this.props;
    const creation_date = moment(comment.creation_date).format('MMM Do, YYYY');

    return (
    <div className="comment">
      <h5>{comment.subject}</h5>
      <h6>{ `${comment.subject} ${creation_date}`}
      {comment.user_id == localStorage.getItem("token") ?
        <>
        <i className="fas fa-edit" onClick={this.editCommentEvent}></i>
        <i className="fas fa-trash-alt mr-3" onClick={this.deleteCommentEvent}></i>
        </>
      : <div></div>}
      </h6>
      <p>{comment.content}</p>
    </div>
    )
  }
    
}

export default withRouter(Comment);
 