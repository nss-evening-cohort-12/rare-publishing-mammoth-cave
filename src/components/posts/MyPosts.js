import React from 'react';
import Post from "./Post"

class MyPosts extends React.Component {
  state = {
    posts: [],
  }
  
  componentDidMount() {
    this.getAllPosts();
  }

  getAllPosts = () => {
    const user_id = localStorage.getItem("token")
    return fetch(`http://localhost:8000/posts?user_id=${user_id}`, {   
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
        <h1 className="text-center mt-3">My Posts</h1>
        <div className="post-container">
          {post}
        </div>
      </div>
    )
  }
}

export default MyPosts;
