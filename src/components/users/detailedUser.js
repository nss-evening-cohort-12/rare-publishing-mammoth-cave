import React from 'react'


class DetailedUser extends React.Component {
  
  state = {
    user: {},
  }
  
  getSingleUser = () => {
    const { userId } = this.props.match.params;
    return fetch(`http://localhost:8088/users/${userId}`)
    .then(res => res.json())
    .then(res => {this.setState({ user: res})}
  }


  render() {
    const { user } = this.state

    return(
      <div className="detailedUser">
        <h4>{user.first_name} {user.last_name}</h4>
        <h5>{user.email}</h5>
        <p>{user.bio}</p>
      </div>
    )
  }
}
