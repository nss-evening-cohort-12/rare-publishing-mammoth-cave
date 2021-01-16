import React from "react";
import { withRouter } from 'react-router-dom';

import User from './User'

class Users extends React.Component {
  state = {
    rareusers: [],
    active:'',
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    return fetch(`http://localhost:8000/rareusers`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`}
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ rareusers: res.results })
      })
  }
  
  render(){
    const { rareusers } = this.state;
    const rareuser = rareusers.map((rareuser) => <User key={rareuser.id} rareuser={rareuser} getAllUsers={this.getAllUsers} />)
    return (
      <div className="col-12 headuser">
        <h1 className="text-center mt-3">All Users</h1>
        <div className="user-container">
          <div className="col-10 subuser">
            {rareuser}
          </div>
        </div>  
      </div>
    )
  }
}

export default withRouter(Users);