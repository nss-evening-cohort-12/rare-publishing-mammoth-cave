import React from 'react';
import { withRouter } from 'react-router-dom';

class EditPost extends React.Component {
  state = {
    category_id: '',
    subject: '',
    content: '',
  }

  componentDidMount() {
    this.getPostById()
  }

  getPostById = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8088/posts/${postId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({ category_id: res.category_id, subject: res.subject, content: res.content })
    })
  }

  changeCategoryEvent = (e) => {
    e.preventDefault();
    this.setState({ category_id: e.target.value });
  }

  changeSubjectEvent = (e) => {
    e.preventDefault();
    this.setState({ subject: e.target.value });
  }

  changeContentEvent = (e) => {
    e.preventDefault();
    this.setState({ content: e.target.value });
  }

  editPost = (e) => {
    e.preventDefault();
    const { category_id, content, subject } = this.state
    const { postId } = this.props.match.params;
    const editDate = Date.now()
    const user_id = localStorage.getItem("rare_user_id")
    const creation_date = new Date(editDate)

    const edited_post = {
      user_id: user_id,
      category_id: category_id,
      subject: subject,
      content: content,
      creation_date: creation_date
    }

    fetch(`http://127.0.0.1:8088/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        edited_post
      )
    })
      .then(res => {
        this.props.history.push(`/viewpost/${postId}`)
      })
  }

  render() {
    const { category_id, subject, content } = this.state;
    return (
      <div className="form-wrapper">
      <h1 className="text-center mt-3">Edit Post</h1>
      <form>
        <div className="form-group">
          <label htmlFor="category_id">Category ID</label>
          <input type="text" className="form-control" id="category_id" value={category_id} onChange={this.changeCategoryEvent}/>
        </div>
        <div className="form-group">
          <label htmlFor="title">Subject</label>
          <input type="text" className="form-control" id="subject" value={subject} onChange={this.changeSubjectEvent} />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea className="form-control" id="content" rows="3" value={content} onChange={this.changeContentEvent}/>
        </div>
      <button className="btn btn-light" onClick={this.editPost}>Submit</button>
    </form>
  </div>
    )
  }
}

export default withRouter(EditPost);
