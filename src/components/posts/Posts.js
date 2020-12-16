import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Post from './Post';
import './Posts.css'

class Posts extends React.Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    this.getAllPosts();
  }

  getAllPosts = () => {
    return fetch("http://localhost:8000/posts", {   
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`}
    }
      )
    .then(res => res.json())
    .then(res => {
      this.setState({ posts: res.results })
    })
  }

  render() {
    const { posts } = this.state;
    const newPost = `/newpost`
    const post = posts.map((post) => <Post key={post.id} post={post} />)
    return (
      <div>
        <div className="container post-buttons">
          <Link to={newPost}><i className="fas fa-plus-square"></i> New Post</Link>
        </div>
        <h1 className="text-center mt-3">View All Posts</h1>
        <div className="post-container">
          {post}
        </div>
      </div>
    )
  }
}

export default withRouter(Posts);
