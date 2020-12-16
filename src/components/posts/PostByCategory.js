import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Post from "./Post";

class PostByCategory extends React.Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    this.getPostsByCat();
  }

  getPostsByCat = () => {
    const { categoryId } = this.props.match.params;
    return fetch(`http://localhost:8000/posts?category_id=${categoryId}`, {   
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`}
      })
    .then(res => res.json())
    .then(res => {
      this.setState({ posts: res.results })
    })
  }

  render() {
    const { posts } = this.state;
    const post = posts.map((post) => <Post key={post.id} post={post} />)
    return (
      <div>
        <h1 className="text-center mt-3">Posts By Category</h1>
        <div className="post-container">
          {post}
        </div>
      </div>
    )
  }
}

export default withRouter(PostByCategory);
