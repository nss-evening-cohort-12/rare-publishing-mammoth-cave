import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PostCard from './PostCard';

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
    const user_id = Number(localStorage.getItem("user_id"))
    const isAdmin = (localStorage.getItem("isAdmin") === "true")
    const postCards = posts.map((post) => <PostCard key={post.id} post={post} isEditable={isAdmin || (post.user_id.id === user_id) ? true : false}/>)
    return (
      <div>
        <h1 className="text-center mt-3">Posts By Category</h1>
        <div className="container cardContainer col-10 mw-75 mh-75 text-center">
          {postCards}
        </div>
      </div>
    )
  }
}

export default withRouter(PostByCategory);
