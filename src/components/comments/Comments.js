import React from 'react';
import { withRouter } from 'react-router-dom';

import Comment from './Comment';

class Comments extends React.Component {
  state = {
    comments: [],
  }

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    return fetch(`http://localhost:8000/comments`, {   
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`}
      }
        )
    .then(res => res.json())
    .then(res => {
      this.setState({ comments: res.results })
    })
  }

  deleteComment = (commentId) => {
    return fetch(`http://localhost:8000/comments/${commentId}`, {
      method: "DELETE"
    }).then(() => this.getComments())
  }

  render() {
    const { comments } = this.state;
    const comment = comments.map((comment) => <Comment key={comment.id} comment={comment} getComments={this.getComments} deleteComment={this.deleteComment} />)
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