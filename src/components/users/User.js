import React from "react";
import {Link, withRouter} from 'react-router-dom';
import './User.css'

class User extends React.Component {
  
  render(){

    const { user } = this.props

    const userDetails = `/user/${user.id}`;

  return (
    <div>
    <Link to={userDetails}><h5>Name: {user.first_name} {user.last_name}<br/>
    Email: {user.email}</h5></Link>
    </div>
  )
  }
}

export default withRouter(User);
