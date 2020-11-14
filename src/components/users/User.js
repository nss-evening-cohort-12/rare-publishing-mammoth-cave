import React from "react";
import {Link, withRouter} from 'react-router-dom';

class User extends React.Component {
  
  render(){

    const { user } = this.props

    const userDetails = `/user/${user.id}`;

  return (<>
    <Link to={userDetails}>Name: {user.first_name} {user.last_name}<br/>
    Email: {user.email}</Link>
  </>
  )
  }
}

export default withRouter(User);
