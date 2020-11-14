import React from 'react'
import {withRouter} from 'react-router-dom'


class DetailedUser extends React.Component {
  
  state = {
    user: {},
  }

  componentDidMount() {
    this.getSingleUser()
  }
  
  getSingleUser = () => {
    const { userId } = this.props.match.params
    return fetch(`http://localhost:8088/users/${userId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({ user: res })
    })
  }

  render() {
    const { first_name, last_name, email, bio } = this.state.user;
    return (
      <div className="post-container">
      <h4>{first_name} {last_name}</h4>
        <h5>{email}</h5>
        <p>{bio}</p>
      </div>
    )
  }
}

export default withRouter(DetailedUser)
