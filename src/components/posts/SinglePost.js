import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Comment from '../comments/Comment'
import './SinglePost.css';

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

  render() {
    const { post, comments } = this.state;
    const creation_date = moment(post.creation_date).format('MMM Do, YYYY');
    const commentString = comments.map((comment) => <Comment key={comment.id} comment={comment} />)
    return (
      <div className="full-post">
        <h1>{post.subject}</h1>
        <h5>{post.content}</h5>
        <h4 className="mt-4">{creation_date}</h4>
        <div>
          New Comment Here:
        </div>
        {commentString}
      </div>
    )
  }
}

export default withRouter(SinglePost);
