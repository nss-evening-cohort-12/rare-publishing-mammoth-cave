import React from 'react';
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
    return fetch("http://localhost:8088/posts/")
    .then(res => res.json())
    .then(res => {
      this.setState({ posts: res })
    })
  }

  render() {
    const { posts } = this.state;
    const post = posts.map((post) => <Post key={post.id} post={post} />)
    return (
      <div>
        <h1 className="text-center mt-3">View All Posts</h1>
        <div className="post-container">
          {post}
        </div>
      </div>
    )
  }
}

export default Posts;
