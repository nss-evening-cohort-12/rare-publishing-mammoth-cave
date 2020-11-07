import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';


class Post extends React.Component {

  render() {
    const { comment } = this.props;
    const creation_date = moment(comment.creation_date).format('MMM Do, yyyy');
    return(
      <div className="comment">
        <h5>{comment.subject}</h5>
        <h6>{`${comment.user.first_name} ${comment.user.last_name} - ${creation_date}`}</h6>
        <p>{comment.content}</p>
        
      </div>
    )
  }
}

export default withRouter(Post);
//<h5>{comment.user.first_name} {post.user.last_name}</h5>
