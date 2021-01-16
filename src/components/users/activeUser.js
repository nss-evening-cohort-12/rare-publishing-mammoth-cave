import React from 'react'

class ActiveCheckboxes extends React.Component {
  // state = {
  //   active: '', 
  // }
  
  // editActive = (e) => {
  //   e.preventDefault();
  //   const { active } = this.state
  //   const { rareuserId } = this.props.match.params;

  //   const editedActive = {
  //     label: active,
  //   }

  //   fetch(`http://localhost:8000/rareusers/${rareuserId}`, {
  //     method: "PUT",
  //     headers: {
  //       "Authorization": `Token ${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify(
  //       editedActive
  //     )
  //   })
  //     .then(res => {
  //       this.props.history.push(`/rareusers`)
  //     })

  // }

    render(){
        const { rareuser, editActive, checked } = this.props
        return (
            <div className="form-check col-sm activeUserCheck">
              <input 
                className="form-check-input" 
                onChange={e => editActive(e)} 
                type="checkbox" 
                defaultChecked={checked} 
                value={rareuser.active} 
                id={rareuser.id} />
                <label className="form-check-label">
                  Active
                </label>
            </div>
        )
    }
}

export default ActiveCheckboxes
