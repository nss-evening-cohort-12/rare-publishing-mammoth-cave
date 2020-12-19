import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment'
import Checkboxes from '../tags/checkboxes';

class EditPost extends React.Component {
  state = {
    category_id: 0,
    subject: '',
    content: '',
    categories: [],
    user_id: 0,
    image_url: '',
    tags: [],
    approved: true,
    all_tags: [],
    checkboxes: []
  }

  compo
  componentDidMount() {
    this.getPostById();
    this.getAllCategories();
  }


  setChecks = () => {
    const {all_tags, tags} = this.state
    console.warn(all_tags)
    const checkboxArr = []
    all_tags.forEach(tag => {
      if (tags.includes(tag.id)) {
        checkboxArr.push({
          checked: true,
          tag: tag
        })
      }
      else {
        checkboxArr.push ({
          checked: false,
          tag: tag
        })
      }
    })
    this.setState({ checkboxes: checkboxArr})
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

  getAllTags = () => {
    return fetch("http://localhost:8000/tags", {
      headers:{
          "Authorization": `Token ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({ all_tags: res.results })
      this.setChecks()
    })
  }

  getPostById = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8000/posts/${postId}`, {   
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`}
      }
        )
    .then(res => res.json())
    .then(res => {
      this.setState({ user_id: res.user_id, category_id: res.category_id.id, subject: res.title, content: res.content, image_url: res.image_url, tags: res.tags, approved: res.approved })
      this.getAllTags()
    })
  }

  changeCategoryEvent = (e) => {
    e.preventDefault();
    this.setState({ category_id: Number(e.target.value) });
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
    const {user_id, category_id, content, subject, image_url, approved, tags, all_tags } = this.state
    const { postId } = this.props.match.params;
    const editDate = Date.now()
    const creation_date = new Date(editDate)

    const edited_post = {
      user_id: user_id.id,
      category_id: category_id,
      title: subject,
      content: content,
      publication_date: moment(creation_date).format('YYYY-MM-DD'),
      image_url,
      approved,
      tags,
    }

    fetch(`http://127.0.0.1:8000/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
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

    handleChecked = (e) => {
      let checkedTags = this.state.tags;
      if (!checkedTags.includes(Number(e.target.id))) {
        checkedTags.push(Number(e.target.id))
        this.setState({tags: checkedTags})
      }
      else {
        checkedTags.splice(checkedTags.indexOf(e.target.id), 1)
        this.setState({tags: checkedTags})
      }

    }
  render() {
    const { category_id, subject, content, categories, tags, all_tags, checkboxes } = this.state;
    return (
      <div className="form-wrapper">
      <h1 className="text-center mt-3">Edit Post</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title">Subject</label>
          <input type="text" className="form-control" id="subject" value={subject} onChange={this.changeSubjectEvent} />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea className="form-control" id="content" rows="3" value={content} onChange={this.changeContentEvent}/>
        </div>
        <div className="form-group">
          <label htmlFor="category_id">Category</label>
            <select value={category_id} onChange={this.changeCategoryEvent}>              
              {categories.map(category => <option value={category.id}>{category.label}</option>)}
            </select>
        </div>
        <div className="form-check"> 
          <label class="form-check-label" for="defaultCheck1">Tags</label>
            {checkboxes.map(checkbox => <Checkboxes key={checkbox.tag.id} Checked={checkbox.checked} tag={checkbox.tag} handleChecked={this.handleChecked} />)}
        </div>
        
      <button className="btn btn-light" onClick={this.editPost}>Submit</button>
    </form>
  </div>
    )
  }
}

export default withRouter(EditPost);
