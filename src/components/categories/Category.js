import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Category.css';

class Category extends React.Component {

  deleteCategory = () => {
    const { category, getAllCategories } = this.props;
    return fetch(`http://localhost:8000/categories/${category.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
    .then(() => getAllCategories())
  }

  render() {
    const { category } = this.props;
    const categoryPosts = `/category/${category.id}`
    const editCategory = `/editcategory/${category.id}`
    return (
      <div className="d-flex justify-content-center cat-list">
        <div className="btn-group-sm cat-bg">
          <Link to={categoryPosts}><button className="btn-primary" id={category.id}> {category.label} </button></Link>
          <Link to={editCategory}><button className="btn-warning"><i className="fas fa-pen"></i></button></Link>
          <button className="btn-danger" onClick={this.deleteCategory}><i className="fas fa-skull"></i></button>
        </div>
      </div>  
    )
  }
}

export default withRouter(Category);
