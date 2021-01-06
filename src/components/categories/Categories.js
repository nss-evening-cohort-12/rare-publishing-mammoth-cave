import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Category from './Category';

import './Categories.css';

class Categories extends React.Component {
  state = {
    categories: [],
  }

  componentDidMount() {
    this.getAllCategories();
  }

  getAllCategories = () => {
    return fetch("http://localhost:8000/categories", {
      headers:{
          "Authorization": `Token ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({ categories: res.results })
    })
  }

  render() {
    const { categories } = this.state;
    const newCategory = `/newcategory`
    const category = categories.map ((category) => <Category key={category.id} getAllCategories={this.getAllCategories} category={category} />)
    return (
      <div className="text-center">
        <h1 className="text-center">Categories</h1>
          <Link to={newCategory}>Create Category</Link>
        <div className="cat-container">
          {category}
        </div>
      </div>
    )
  }
}

export default withRouter(Categories);
