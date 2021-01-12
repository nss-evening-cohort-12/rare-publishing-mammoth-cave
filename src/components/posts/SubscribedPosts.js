import { HTML5_FMT } from 'moment';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PostCard from './PostCard';
import './Posts.css'

class SubscribedPosts extends React.Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    this.getSubscribedPosts();
  }

  getSubscribedPosts = () => {
    const userId = localStorage.getItem("user_id")
    return fetch(`http://localhost:8000/posts?subscribed=${userId}`, {   
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
    const isAdmin = (localStorage.getItem("isAdmin") === "true")
    const newPost = `/newpost`
    const postCards = posts.map((post) => <PostCard key={post.id} post={post} isEditable={false} />)
    return (
      <div>
        <div className="container post-buttons">
          <span className="text-right"><Link to={newPost}>Add Post <i className="fas fa-plus-square"></i></Link></span>
        </div>
        <div className="container cardContainer col-10 mw-75 mh-75 text-center">
          {postCards}
        </div>
      </div>
    )
  }
}

export default withRouter(SubscribedPosts);
