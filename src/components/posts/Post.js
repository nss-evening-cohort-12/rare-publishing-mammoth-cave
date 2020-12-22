import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import './Post.css';

class Post extends React.Component {
  render() {
    const { post } = this.props;
    const postDetails = `/viewpost/${post.id}`
    const creation_date = moment(post.publication_date).format('L');
    return(
      <div className="post-list">
        <h5>{post.user_id.user_id.first_name} {post.user_id.user_id.last_name}</h5>
        <Link to={postDetails}><h5>{post.title}</h5></Link>
        <h5>{creation_date}</h5>
        <h5>{post.category_id.label}</h5>
        <h5>{post.tags.map(tag => <h5>{tag.label}</h5>)}</h5>
      </div>
    )
  }
}

export default withRouter(Post);
