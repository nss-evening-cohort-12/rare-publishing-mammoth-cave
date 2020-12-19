import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Post from "./Post"
import './Posts.css'

class MyPosts extends React.Component {
  state = {
    posts: [],
  }
  
  componentDidMount() {
    this.getAllPosts();
  }

  getAllPosts = () => {
    const user_id = localStorage.getItem("user_id")
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
    const newPost = `/newpost`
    const post = posts.map((post) => <Post key={post.id} post={post} />)
    return (
      <div>
        <div className="container post-buttons">
          <Link to={newPost}>Add Post <i className="fas fa-plus-square"></i></Link>
        </div>
        <h1 className="text-center mt-3">My Posts</h1>
        <div className="post-container">
          {post}
        </div>
      </div>
    )
  }
}

export default withRouter(MyPosts);
