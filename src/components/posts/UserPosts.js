import React from 'react';
import { withRouter } from 'react-router-dom';
import PostCard from "./PostCard"
import './Posts.css'
import './PostCard.css'

class UserPosts extends React.Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    this.getUserPosts();
  }

  getUserPosts = () => {
    const { userId } = this.props.match.params;
    return fetch(`http://localhost:8000/posts?user_id=${userId}`, {   
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`}
      }
        )
    .then(res => res.json())
    .then(res => {
      this.setState({ posts: res.results })
    })
  }

  render() {
    const { posts } = this.state;
    const user_id = Number(localStorage.getItem("user_id"))
    const isAdmin = (localStorage.getItem("isAdmin") === "true")
    const postCards = posts.map((post) => <PostCard key={post.id} post={post} isEditable={isAdmin || (post.user_id.id === user_id) ? true : false} />)
    return (
      <div>
        <h1 className="text-center mt-3">User Posts</h1>
        <div className="container cardContainer col-10 mw-75 mh-75 text-center">
          {postCards}
        </div>
      </div>
    )
  }

}

export default withRouter(UserPosts);
