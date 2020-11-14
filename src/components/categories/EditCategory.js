import React from 'react';
import { withRouter } from 'react-router-dom';

import './EditCategory.css';

class EditCategory extends React.Component {
  state = {
    name: '',
  }

  componentDidMount() {
    this.getCategoryById()
  }

  getCategoryById = () => {
    const { categoryId } = this.props.match.params;
    return fetch(`http://localhost:8088/categories/${categoryId}`)
    .then (res => res.json())
    .then (res => {
      this.setState({ name: res.name })
    })
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  editCategory = (e) => {
    e.preventDefault();
    const { name } = this.state
    const { categoryId } = this.props.match.params;

    const editedCategory = {
      name: name,
    }

    fetch(`http://localhost:8088/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        editedCategory
      )
    })
      .then(res => {
        this.props.history.push(`/categories`)
      })
  }

  render() {
    const { name } = this.state
    return (
      <div className="editCatForm">
        <h2 className="text-center">Edit Category</h2>
        <div className="editFormContainer">
          <form className="col-4">
            <div className="form-group">
              <label htmlFor="name">Category Re-Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Category Name"
                value={name}
                onChange={this.changeNameEvent}
              />
            </div>
            <button className="btn-warning" onClick={this.editCategory}>Edit that Category</button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(EditCategory);