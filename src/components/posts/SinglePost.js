import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import './SinglePost.css';

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

  render() {
    const { postId } = this.props.match.params;
    const { post } = this.state;
    const creation_date = moment(post.creation_date).format('MMM Do, YYYY');
    return (
      <div className="full-post">
        <h1>{post.subject}</h1>
        <h5>{post.content}</h5>
        <h4 className="mt-4">{creation_date}</h4>
      </div>
    )
  }
}

export default withRouter(SinglePost);
