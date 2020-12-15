import React from 'react';
import { withRouter } from 'react-router-dom';
import './EditTag.css';

class EditTag extends React.Component {
  state = {
    name: '',
  }

  componentDidMount() {
    this.getTagById()
  }

  getTagById = () => {
    const { tagId } = this.props.match.params;
    return fetch(`http://localhost:8000/tags/${tagId}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
    .then(res => {
      this.setState({ name: res.name })
    })
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  editTag = (e) => {
    e.preventDefault();
    const { name } = this.state
    const { tagId } = this.props.match.params;

    const editedTag = {
      label: name,
    }

    fetch(`http://localhost:8000/tags/${tagId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        editedTag
      )
    })
    .then(res => {
      this.props.history.push(`/tags`)
    })
  }

  render() {
    const { name } = this.state
    return (
      <div className="editTagForm">
        <h2 className="text-center">Edit Tag</h2>
        <div className="editFormContainer">
          <form className="col-4">
            <div className="form-group">
              <label htmlFor="name">Tag Name Change</label>
              <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Tag Name"
              value={name}
              onChange={this.changeNameEvent}
              />
            </div>
            <button className="btn-warning" onClick={this.editTag}>Edit Tag</button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(EditTag);
