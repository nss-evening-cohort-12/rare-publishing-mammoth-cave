import React from 'react';
import moment from 'moment';
import './Post.css';

class Post extends React.Component {
  render() {
    const { post } = this.props;
    const creation_date = moment(post.creation_date).format('MMM Do, YYY');
    return(
      <div className="post-list">
        <h5>{post.user.first_name} {post.user.last_name}</h5>
        <h5>{post.subject}</h5>
        <h5>{post.category.name}</h5>
      </div>
    )
  }
}

export default Post;
