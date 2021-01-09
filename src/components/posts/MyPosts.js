import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PostCard from "./PostCard"
import './Posts.css'
import './PostCard.css'

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
    const postCards = posts.map((post) => <PostCard key={post.id} post={post} isEditable={true} />)
    return (
      <div>
        <div className="container post-buttons">
          <Link to={newPost}>Add Post <i className="fas fa-plus-square"></i></Link>
        </div>
        <h1 className="text-center mt-3">My Posts</h1>
        <div className="container cardContainer col-10 mw-75 mh-75 text-center">
          {postCards}
        </div>
      </div>
    )
  }
}

export default withRouter(MyPosts);
