import React from "react";
import { withRouter} from 'react-router-dom';
import './User.css'

class User extends React.Component {
  
  render(){
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
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
            <label className="form-check-label">
              Author
            </label>
        </div>
        <div className="form-check">
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
