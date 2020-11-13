import React from 'react';
import { withRouter } from 'react-router-dom';

class EditCategory extends React.Component {
  state = {
    name: '',
  }

  componentDidMount() {
    this.getCategoryById()
  }

  getCategoryById = () => {
    const { category } = this.props;
    return fetch(`http://localhost:8088/categories/${category.id}`)
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
    const { category } = this.props;

    const editedCategory = {
      name: name,
    }

    fetch(`http://localhost:8088/categories/${category.id}`, {
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
        this.props.history.push(`/viewcategory/${category.id}`)
      })
  }

  render() {
    const { name } = this.state
    return (
      <div className="editCatForm">
        <h2 className="text-center">Edit Category</h2>
        <form className="col-4">
          <div className="form-group">
            <label htmlFor="name">Category Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Category Name"
              onChange={this.changeNameEvent}
            />
          </div>
          <button className="btn-primary" onClick={this.editCategory}>Edit that Category</button>
        </form>
      </div>
    )
  }
}

export default withRouter(EditCategory);