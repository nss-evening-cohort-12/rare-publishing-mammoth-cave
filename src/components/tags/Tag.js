import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Tag.css';

class Tag extends React.Component {
  
  deleteTag = () => {
    const { tag, getAllTags } = this.props;
    return fetch(`http://localhost:8000/tags/${tag.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`
      }
    })
    .then(() => getAllTags())
  }

  render() {
    const { tag } = this.props;
    const isAdmin = (localStorage.getItem("isAdmin") === "true")
    const tagPosts = `/tags/${tag.id}`
    const editTag = `/edittag/${tag.id}`
    return (
      <div className="d-flex justify-content-center tag-list">
        <div className="btn-group-sm tag-bg">
          <Link to={tagPosts}><button className="btn-primary" id={tag.id}> {tag.label} </button></Link>
          {
            isAdmin ? (
              <>
              <Link to={editTag}><button className="btn-warning"><i className="fas fa-pen"></i></button></Link>
              <button className="btn-danger" onClick={this.deleteTag}><i className="fas fa-skull"></i></button>
              </>
            ) : (
              ""
            )
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Tag);
