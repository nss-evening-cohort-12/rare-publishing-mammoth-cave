import React from 'react'
import {withRouter} from 'react-router-dom'
import Post from '../posts/Post'

class DetailedUser extends React.Component {
  
  state = {
    user: {},
    posts: [],
  }

  componentDidMount() {
    this.getSingleUser()
    this.getUserPosts()
  }
  
  getSingleUser = () => {
    const { userId } = this.props.match.params
    return fetch(`http://localhost:8088/users/${userId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({ user: res })
    })
  }

  getUserPosts = () => {
    const { userId } = this.props.match.params;
    return fetch(`http://localhost:8088/posts?user_id=${userId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({ posts: res })
    })
  }

  render() {
    const { posts } = this.state;
    const { first_name, last_name, email, bio } = this.state.user;
    const post = posts.map((post) => <Post key={post.id} post={post} />)
    return (
      <div>
        <div className="post-container">
          <h4>{first_name} {last_name}</h4>
          <h5>{email}</h5>
          <p>{bio}</p>
        </div>
        <div className="post-container">
          {post}
        </div>
      </div>
    )
  }
}

export default withRouter(DetailedUser)
