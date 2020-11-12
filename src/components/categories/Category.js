import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Category extends React.Component {

  deleteCategory = () => {
    const { category } = this.props;
    return fetch(`http://localhost:8088/categories/${category.id}`, {
      method: "DELETE"
    }).then(() => {
      this.props.history.push('/categories');
    })
  }

  render() {
    const { category } = this.props;
    const categoryPosts = `/category/${category.id}`
    return (
      <div className="d-flex justify-content-center cat-list">
        <div className="btn-group-sm">
          <Link to={categoryPosts}><button className="btn-primary" id={category.id}>{category.name}</button></Link>
          <button className="btn-danger" onClick={this.deleteCategory}><i className="fas fa-skull"></i></button>
        </div>
      </div>  
    )
  }
}

export default withRouter(Category);
