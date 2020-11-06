import React from 'react';
import { withRouter } from 'react-router-dom';
import './NewPost.css';

class NewPost extends React.Component {
  state = {
    category_id: '',
    subject: '',
    content: '',
  }

  changeCategoryEvent = (e) => {
    e.preventDefault();
    this.setState({ category_id: e.target.value });
  }

  changeSubjectEvent = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  changeContentEvent = (e) => {
    e.preventDefault();
    this.setState({ content: e.target.value });
  }

  createPost = (e) => {
    e.preventDefault();
    const { category_id, subject, content } = this.state
    const user_id = localStorage.getItem("rare_user_id")
    const creation_date = Date.now()

    const new_post = {
      user_id: user_id,
      category_id: category_id,
      subject: subject,
      content: content,
      creation_date: creation_date
    }
    fetch("http://127.0.0.1:8088/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        new_post
      )
    })
      .then(res => res.json())
      .then(res => {
        console.error(res);
        this.props.history.push('/posts')
      })
  }

  render() {
    return (
      <div className="form-wrapper">
        <h1 className="text-center mt-3">Create New Post</h1>
        <form>
          <div className="form-group">
            <label htmlFor="category_id">Category ID</label>
            <input type="text" className="form-control" id="category_id" placeholder="Category ID" onChange={this.changeCategoryEvent}/>
          </div>
          <div className="form-group">
            <label htmlFor="subject">Post Subject</label>
            <input type="text" className="form-control" id="subject" placeholder="Post Subject" onChange={this.changeSubjectEvent} />
          </div>
          <div className="form-group">
            <label htmlFor="content">Post Content</label>
            <textarea className="form-control" id="content" rows="3"  placeholder="Post" onChange={this.changeContentEvent}/>
          </div>
        <button className="btn btn-light" onClick={this.createPost}>Create</button>
      </form>
    </div>
    )
  }
}

export default withRouter(NewPost);
