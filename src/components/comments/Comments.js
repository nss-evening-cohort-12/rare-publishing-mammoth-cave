import React from 'react';
import { withRouter } from 'react-router-dom';

import Comment from './Comment';

class Comments extends React.Component {
  state = {
    comments: [],
  }

  componentDidMount() {
    this.getCommentsByPostId ();
  }

  getCommentsByPostId = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8000/comments?post_id=${postId}`, {   
      headers: {
        "Authorization": `Token ${localStorage.getItem("user_id")}`}
      }
        )
    .then(res => res.json())
    .then(res => {
      this.setState({ comments: res.results })
    })
  }

  render() {
    const { comments } = this.state;
    console.error(comments)
    const comment = comments.map((comment) => <Comment key={comment.id} comment={comment} />)
    return (
      <div className="text-center">
        <h1 className="text-center">Comments</h1>
        <div className="make new comment"></div>
        <div className="comment-container">
          {comment}
        </div>
      </div>
    )
  }
}

export default withRouter(Comments);