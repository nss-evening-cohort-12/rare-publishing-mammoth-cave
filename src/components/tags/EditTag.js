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
    .then(res = res.json())
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
        <h2 className="editFormContainer">Edit Tag</h2>
        <div className="col-4">
          <form className="">

          </form>
        </div>
      </div>
    )
  }
}
