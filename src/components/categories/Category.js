import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Category extends React.Component {
  render() {
    const { category } = this.props;
    const categoryPosts = `/category/${category.id}`
    return (
      <div className="d-flex justify-content-center cat-list">
        <Link to={categoryPosts}><button className="btn-primary" id={category.id}>{category.name}</button></Link>
      </div>
    )
  }
}

export default withRouter(Category);
