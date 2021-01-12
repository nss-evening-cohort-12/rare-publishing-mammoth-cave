import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import Post from '../posts/Post'

class DetailedUser extends React.Component {
  
  state = {
    user: {},
    posts: [],
    sub: [],
  }

  componentDidMount() {
    this.getSingleUser()
    this.getUserPosts()
    this.getSub()
  }
  
  getSingleUser = () => {
    const { userId } = this.props.match.params;
    return fetch(`http://localhost:8000/users/${userId}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`}
    })
    .then(res => res.json())
    .then(res => {
      this.setState({ user: res })
    })
  }

  getUserPosts = () => {
    const { userId } = this.props.match.params;
    return fetch(`http://localhost:8000/posts?user_id=${userId}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`}
    })
    .then(res => res.json())
    .then(res => {
      this.setState({ posts: res })
    })
  }

  getSub = () => {
    const author_id = this.props.match.params.userId;
    const follower_id = localStorage.getItem('user_id')

    return   fetch(`http://localhost:8000/subscriptions?follower_id=${Number(follower_id)}&author_id=${author_id}`, {   
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`}
      })
      .then(res => res.json())
      .then(res => this.setState({sub: res.results[0]}))

  }

  subUnsub = (e) => {
    e.preventDefault()
    const author_id = this.props.match.params.userId;
    const follower_id = localStorage.getItem('user_id')
    const { sub } = this.state
    if (!sub) {
      const new_sub = {
        follower_id,
        author_id,
      }
      fetch("http://127.0.0.1:8000/subscriptions", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
          new_sub
        )
      })
        .then(res => res.json())
        .then(res => {
          this.getSub()
        })
    }
    else {
      return fetch(`http://localhost:8000/subscriptions/${sub.id}`, {
      method: "DELETE",
        headers: {
          "Authorization": `Token ${localStorage.getItem("rare_user_id")}`}
    }).then(() => {
      this.getSub()
    })
    }
  }

 
  render() {
    const { posts, sub, user } = this.state;
    const isAdmin = (localStorage.getItem("isAdmin") === "true")
    const userPosts = `/usersposts/${user.id}`
    const {bio, created_on, profile_image_url, user_id } = this.state.user;
    return (
      <div className="d-flex row">
        <div className="ml-auto">
        <div className="profileImg"><img src={profile_image_url} /></div>
        <div className="profileName"><h3>Name: {user_id && user_id.first_name} {user_id && user_id.last_name} </h3></div>
        </div>
        <div className="profileText m-5">
        <div className="profileUsername"><h3>Username: {user_id && user_id.username}</h3></div>
        <div className="profileEmail"><h3>Email: {user_id && user_id.email}</h3></div>
        <div className="CreationDate"><h3>Creation Date: {created_on}</h3></div>
        <div className="profileTyle"><h3>User Type:{user_id && user_id.is_staff ? "Admin" : "Author"}</h3> </div>
        <Link to={userPosts}><div classname="articleCount"><h3>Number of Articles: {posts.count}</h3></div></Link>
        </div>
        <div className="subscribed mr-auto">{sub && sub.id ? <button className="btn" onClick={this.subUnsub}>Unsubscribe</button> : <button className="btn" onClick={this.subUnsub}> Subscribe</button>}</div>
      </div>
    )
  }
}

export default withRouter(DetailedUser)
