import React from 'react'
import './checkboxes.css'

class Checkboxes extends React.Component {


    render(){
        const { tag, handleChecked, Checked} = this.props
        return (
            <li className="checkboxes" style={{"list-style-type": "none"}}>
            <div><input className="form-check-input" onChange={handleChecked} type="checkbox" defaultChecked={Checked} value={tag.label} id={tag.id} />{tag.label}</div>
            </li>
        )
    }
}

export default Checkboxes
