import React from 'react';
import { withRouter } from 'react-router-dom';

class NewCategory extends React.Component {
  state = {
    name: '',
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  createCategory = (e) => {
    e.preventDefault();
    const { name } = this.state

    const newCategory = {
      name: name
    }
    fetch ("http://127.0.0.1:8088/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        newCategory
      )
    })
      .then(res => res.json())
      .then(res => {
        this.props.history.push('/categories')
      })
  }

  render() {
    return(
      <div className="newCatForm">
        <h2 className="text-center">Create New Category</h2>
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
          <button className="btn-primary" onClick={this.createCategory}>Create that Category</button>
        </form>
      </div>
    )
  }
}

export default withRouter(NewCategory);
