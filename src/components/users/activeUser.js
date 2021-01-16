import React from 'react'

class ActiveCheckboxes extends React.Component {

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
