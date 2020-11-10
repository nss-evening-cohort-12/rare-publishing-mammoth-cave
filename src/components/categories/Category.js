import React from 'react';

class Category extends React.Component {
  render() {
    const { category } = this.props;
    return (
      <div className="d-flex justify-content-center cat-list">
        <button className="btn-primary" id={category.id}>{category.name}</button>
      </div>
    )
  }
}

export default Category;
