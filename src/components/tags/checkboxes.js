import React from 'react'


class Checkboxes extends React.Component {


    render(){
        const { tag, handleChecked, Checked} = this.props
        return (
            <li style={{"list-style-type": "none"}}>
            <div><input className="form-check-input" onChange={handleChecked} type="checkbox" defaultChecked={Checked} value={tag.label} id={tag.id} /> {tag.label}</div>
            </li>
        )
    }
}

export default Checkboxes