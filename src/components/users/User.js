import React from "react";
import { Link, withRouter } from 'react-router-dom';
import ActiveCheckboxes from './activeUser';
import RoleRadios from './userRole';
import './User.css'

class User extends React.Component {
  state = {
    active: '',
    staff: '',
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

  promoteUser = () => {
    const { staff } = this.state
    const { getAllUsers } = this.props
    const rareuserId = this.props.rareuser.id;

    const editedStaff = {
      is_staff: true,
    }

    fetch(`http://localhost:8000/users/${rareuserId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        editedStaff
      )
    })
      .then(res => {
        getAllUsers()
      })

  }

  demoteUser = () => {
    const { staff } = this.state
    const { getAllUsers } = this.props
    const rareuserId = this.props.rareuser.id;

    const editedStaff = {
      is_staff: false,
    }

    fetch(`http://localhost:8000/users/${rareuserId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        editedStaff
      )
    })
      .then(res => {
        getAllUsers()
      })

  }


  
  render(){
    const { rareuser } = this.props;
    const userDetails = `/users/${rareuser.id}`
    

    const active = <ActiveCheckboxes key={rareuser.id} checked={rareuser.active} rareuser={rareuser} editActive={this.editActive} />;
    const role = <RoleRadios key={rareuser.id} checked={rareuser.user_id.is_staff} rareuser={rareuser} promoteUser={this.promoteUser} demoteUser={this.demoteUser} />;

    return (
      <div className="row-10 useradmin">
        <Link className="col-4 userName" to={userDetails}><h5>Name: {rareuser.user_id && rareuser.user_id.username}</h5></Link>
        <h5 className="col-4 userEmail">Email: {rareuser.user_id && rareuser.user_id.email}</h5>
        { active }
        { role }
      </div>
    )
  }
}

export default withRouter(User);
