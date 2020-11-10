import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';


class Comment extends React.Component {
  render() {
    const { comment } = this.props;
    const creation_date = moment(comment.creation_date).format('MMM Do, yyyy');
    console.warn(comment.user_id)
    console.warn(localStorage.getItem("rare_user_id"))
    return(
      <div className="comment">
        <h5>{comment.subject}</h5>
        <h6>{`${comment.user.first_name} ${comment.user.last_name} - ${creation_date}`}</h6>
        <p>{comment.content}</p>
        {comment.user_id == localStorage.getItem("rare_user_id") ? <div><btn>Edit</btn><btn>Delete</btn></div> : <div></div>}
      </div>
    )
  }
}

export default withRouter(Comment);
