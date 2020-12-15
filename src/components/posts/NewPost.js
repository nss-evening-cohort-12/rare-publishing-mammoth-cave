import React from 'react';
import { withRouter } from 'react-router-dom';
import './NewPost.css';
import moment from 'moment';

class NewPost extends React.Component {
  state = {
    category_id: 1,
    subject: '',
    content: '',
    categories: []
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

  createPost = (e) => {
    e.preventDefault();
    const { category_id, subject, content } = this.state
    const user_id = localStorage.getItem("user_id")
    const creation_date = Date.now()

    const new_post = {
      user_id,
      category_id: category_id,
      title: subject,
      content: content,
      publication_date: moment(creation_date).format('YYYY-MM-DD'),
      approved: true,
      image_url: "https://tinyurl.com/yyxuqm45",
      tags: [1]
    }
    fetch("http://127.0.0.1:8000/posts", {
      method: "POST",
      headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(
        new_post
      )
    })
      .then(res => res.json())
      .then(res => {
        this.props.history.push('/posts')
      })
  }

  render() {
    const {categories, category_id } = this.state
    return (
      <div className="form-wrapper">
        <h1 className="text-center mt-3">Create New Post</h1>
        <form>
          <div className="form-group">
            <label htmlFor="category_id">Category</label>
            <select value={category_id} onChange={this.changeCategoryEvent}>              
              {categories.map(category => <option value={category.id}>{category.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" className="form-control" id="subject" placeholder="subject" onChange={this.changeSubjectEvent} />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea className="form-control" id="content" rows="3"  placeholder="content" onChange={this.changeContentEvent}/>
          </div>
        <button className="btn btn-light" onClick={this.createPost}>Create</button>
      </form>
    </div>
    )
  }
}

export default withRouter(NewPost);
