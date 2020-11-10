import React from 'react';
import Category from './Category';

class Categories extends React.Component {
  state = {
    categories: [],
  }

  componentDidMount() {
    this.getAllCategories ();
  }

  getAllCategories = () => {
    return fetch("http://localhost:8088/categories/")
    .then(res => res.json())
    .then(res => {
      this.setState({ categories: res })
    })
  }

  render() {
    const { categories } = this.state;
    const category = categories.map ((category) => <Category key={category.id} category={category} />)
    return (
      <div>
        <h1 className="text-center">All Categories</h1>
        <div className="cat-container">
          {category}
        </div>
      </div>
    )
  }
}

export default Categories;
