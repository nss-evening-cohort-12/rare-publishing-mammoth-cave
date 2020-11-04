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
    
  }
}
