import React from "react";
<<<<<<< HEAD
import { withRouter} from 'react-router-dom';
=======
import { Link, withRouter } from 'react-router-dom';

import ActiveCheckboxes from './activeUser';
>>>>>>> main
import './User.css'

class User extends React.Component {
  state = {
    active: '', 
  }

  editActive = (e) => {
    const { active } = this.state
    const { getAllUsers } = this.props
    const rareuserId = this.props.rareuser.id;

    const editedActive = {
      active: e.target.checked,
    }

    fetch(`http://localhost:8000/rareusers/${rareuserId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        editedActive
      )
    })
      .then(res => {
        getAllUsers()
      })

  }
  
  render(){
<<<<<<< HEAD
    const { rareuser, changeActiveEvent } = this.props;

    return (
      <div className="row usersadmin">
        <h5>Name: {rareuser.user_id && rareuser.user_id.username}</h5>
        <h5>Email: {rareuser.user_id && rareuser.user_id.email}</h5>
        <div className="form-check">
          <input className="form-check-input" onChange={changeActiveEvent} type="checkbox" value={rareuser.active} id={rareuser.id}></input>
            <label className="form-check-label">
              Active
            </label>
        </div>
        <div className="form-check">
=======
    const { rareuser } = this.props;
    const userDetails = `/users/${rareuser.id}`
    

    const active = <ActiveCheckboxes key={rareuser.id} checked={rareuser.active} rareuser={rareuser} editActive={this.editActive} />;

    return (
      <div className="row-10 useradmin">
        <Link className="col-4 userName" to={userDetails}><h5>Name: {rareuser.user_id && rareuser.user_id.username}</h5></Link>
        <h5 className="col-4 userEmail">Email: {rareuser.user_id && rareuser.user_id.email}</h5>
        { active }
        <div className="form-check col-sm userAuthorCheck">
>>>>>>> main
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
            <label className="form-check-label">
              Author
            </label>
        </div>
        <div className="form-check col-sm userAdminCheck">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
            <label className="form-check-label">
              Admin
            </label>
        </div>
      </div>
    )
  }
}

export default withRouter(User);
