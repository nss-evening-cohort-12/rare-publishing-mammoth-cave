import React from 'react';
import { withRouter } from 'react-router-dom';

import './NewCategory.css';

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
      label: name
    }
    fetch ("http://127.0.0.1:8000/categories", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
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
        <div className="newFormContainer">
          <form className="col-4 realForm">
            <div className="form-group">
              <label htmlFor="name">Category Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name that category for 201, Alex"
                onChange={this.changeNameEvent}
              />
            </div>
            <button className="btn-success" onClick={this.createCategory}>Create that Category</button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(NewCategory);
