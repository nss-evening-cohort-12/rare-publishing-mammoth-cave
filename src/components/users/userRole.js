import React from 'react';

class RoleRadios extends React.Component {
  render() {
    const { rareuser, promoteUser, demoteUser, checked } = this.props

    return (
      <>
      {
        checked ? (
          <>
          <div className="form-check col-sm userAuthorCheck">
          <input className="form-check-input" type="radio" checked={!checked} id={rareuser.id} value={!rareuser.user_id.is_staff} onChange={e => demoteUser(e)}/>
          <label className="form-check-label">
            Author
          </label>
          </div>
          <div className="form-check col-sm userAuthorCheck">
            <input className="form-check-input" type="radio"  checked={checked} id={rareuser.id} value={rareuser.user_id.is_staff}/>
            <label className="form-check-label">
              Admin
            </label>
          </div>
          </>
        ) : (
          <>
          <div className="form-check col-sm userAuthorCheck">
          <input className="form-check-input" type="radio"  checked={!checked} id={rareuser.id} value={!rareuser.user_id.is_staff}/>
          <label className="form-check-label">
            Author
          </label>
          </div>
          <div className="form-check col-sm userAuthorCheck">
            <input className="form-check-input" type="radio" checked={checked} id={rareuser.id} value={rareuser.user_id.is_staff} onChange={e => promoteUser(e)}/>
            <label className="form-check-label">
              Admin
            </label>
          </div>
          </>
        )
      }
      </>
    )
  }
}

export default RoleRadios
