import { HTML5_FMT } from 'moment';
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
    const isAdmin = localStorage.getItem("isAdmin")
    const newPost = `/newpost`
    const post = posts.map((post) => <Post key={post.id} post={post} />)
    return (
      <div >
        <div className="container post-buttons">
          <Link to={newPost}>Add Post <i className="fas fa-plus-square"></i></Link>
        </div>
        <h1 className="text-center mt-3">View All Posts</h1>
        <div className="post-container">
      <div className="post-header">
      <h6>Edit/Delete</h6>
      <h5>Author</h5>
      <h5>Title</h5>
      <h5>Date</h5>
      <h5>Category</h5>
      <h5>Tags</h5>
      
      {
          isAdmin === "true"
         ?
        <h4>Approved</h4>
         :
        ""
      }
        </div>
          {post}
        </div>
      </div>
    )
  }
}

export default withRouter(Posts);
