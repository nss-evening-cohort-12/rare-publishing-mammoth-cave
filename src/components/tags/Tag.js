import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Tag.css';

class Tag extends React.Component {
  
  deleteTag = () => {
    const { tag, getAllTags } = this.props;
    return fetch(`http://localhost:8000/tags/${tag.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
      }
    })
    .then(() => getAllTags())
  }

  render() {
    const { tag } = this.props;
    const editTag = `/editTag/${tag.id}`
    return (
      <div className="d-flex justify-content-center tag-list">
        <div className="btn-group-sm tag-bg">
          <button className="btn-primary" id={tag.id}>{tag.label}</button>
          <Link to={editTag}><button className="btn-warning"><i className="fas fa-pen"></i></button></Link>
          <button className="btn-danger" onClick={this.deleteTag}><i className="fas fa-skull"></i></button>
        </div>
      </div>
    )
  }
}

export default withRouter(Tag);
